"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isScheduler_1 = require("../util/isScheduler");
var isArray_1 = require("../util/isArray");
var ArrayObservable_1 = require("./ArrayObservable");
var combineLatest_1 = require("../operator/combineLatest");
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from all the Observables passed as
 * arguments. This is done by subscribing to each Observable in order and,
 * whenever any Observable emits, collecting an array of the most recent
 * values from each Observable. So if you pass `n` Observables to operator,
 * returned Observable will always emit an array of `n` values, in order
 * corresponding to order of passed Observables (value from the first Observable
 * on the first place and so on).
 *
 * Static version of `combineLatest` accepts either an array of Observables
 * or each Observable can be put directly as an argument. Note that array of
 * Observables is good choice, if you don't know beforehand how many Observables
 * you will combine. Passing empty array will result in Observable that
 * completes immediately.
 *
 * To ensure output array has always the same length, `combineLatest` will
 * actually wait for all input Observables to emit at least once,
 * before it starts emitting results. This means if some Observable emits
 * values before other Observables started emitting, all that values but last
 * will be lost. On the other hand, is some Observable does not emit value but
 * completes, resulting Observable will complete at the same moment without
 * emitting anything, since it will be now impossible to include value from
 * completed Observable in resulting array. Also, if some input Observable does
 * not emit any value and never completes, `combineLatest` will also never emit
 * and never complete, since, again, it will wait for all streams to emit some
 * value.
 *
 * If at least one Observable was passed to `combineLatest` and all passed Observables
 * emitted something, resulting Observable will complete when all combined
 * streams complete. So even if some Observable completes, result of
 * `combineLatest` will still emit values when other Observables do. In case
 * of completed Observable, its value from now on will always be the last
 * emitted value. On the other hand, if any Observable errors, `combineLatest`
 * will error immediately as well, and all other Observables will be unsubscribed.
 *
 * `combineLatest` accepts as optional parameter `project` function, which takes
 * as arguments all values that would normally be emitted by resulting Observable.
 * `project` can return any kind of value, which will be then emitted by Observable
 * instead of default array. Note that `project` does not take as argument that array
 * of values, but values themselves. That means default `project` can be imagined
 * as function that takes all its arguments and puts them into an array.
 *
 *
 * @example <caption>Combine two timer Observables</caption>
 * const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
 * const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
 * const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
 * combinedTimers.subscribe(value => console.log(value));
 * // Logs
 * // [0, 0] after 0.5s
 * // [1, 0] after 1s
 * // [1, 1] after 1.5s
 * // [2, 1] after 2s
 *
 *
 * @example <caption>Combine an array of Observables</caption>
 * const observables = [1, 5, 10].map(
 *   n => Rx.Observable.of(n).delay(n * 1000).startWith(0) // emit 0 and then emit n after n seconds
 * );
 * const combined = Rx.Observable.combineLatest(observables);
 * combined.subscribe(value => console.log(value));
 * // Logs
 * // [0, 0, 0] immediately
 * // [1, 0, 0] after 1s
 * // [1, 5, 0] after 5s
 * // [1, 5, 10] after 10s
 *
 *
 * @example <caption>Use project function to dynamically calculate the Body-Mass Index</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} observable1 An input Observable to combine with other Observables.
 * @param {ObservableInput} observable2 An input Observable to combine with other Observables.
 * More than one input Observables may be given as arguments
 * or an array of Observables may be given as the first argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each input Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @static true
 * @name combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbWJpbmVMYXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtREFBb0Q7QUFDcEQsMkNBQTRDO0FBQzVDLHFEQUFzRDtBQUN0RCwyREFBb0U7QUF1QnBFLG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyR0c7QUFDSDtJQUFvQyxxQkFHMkI7U0FIM0IsVUFHMkIsRUFIM0IscUJBRzJCLEVBSDNCLElBRzJCO1FBSDNCLGdDQUcyQjs7SUFDN0QsSUFBSSxPQUFPLEdBQWtDLElBQUksQ0FBQztJQUNsRCxJQUFJLFNBQVMsR0FBZSxJQUFJLENBQUM7SUFFakMsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxTQUFTLEdBQWUsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxHQUFpQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELDhFQUE4RTtJQUM5RSw0RUFBNEU7SUFDNUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsV0FBVyxHQUEyQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLGlDQUFlLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLHFDQUFxQixDQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDcEcsQ0FBQztBQXRCRCxzQ0FzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyAgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0ICB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgIElTY2hlZHVsZXIgIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7ICBpc1NjaGVkdWxlciAgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7ICBpc0FycmF5ICB9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyAgQXJyYXlPYnNlcnZhYmxlICB9IGZyb20gJy4vQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7ICBDb21iaW5lTGF0ZXN0T3BlcmF0b3IgIH0gZnJvbSAnLi4vb3BlcmF0b3IvY29tYmluZUxhdGVzdCc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDJdPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMz4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzXT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDU+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDVdPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFQ1LCBUNj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDUsIFQ2XT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHByb2plY3Q6ICh2MTogVCkgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBUNSwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VD4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUW10+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8Uj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxhbnk+W10sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgUj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdLCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxUPikgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSwgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxUPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgSVNjaGVkdWxlcj4pOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgKCguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSKSB8IElTY2hlZHVsZXI+KTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKSB8IElTY2hlZHVsZXI+KTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgd2hvc2UgdmFsdWVzIGFyZVxuICogY2FsY3VsYXRlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVzIG9mIGVhY2ggb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciBhbnkgaW5wdXQgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBpdFxuICogY29tcHV0ZXMgYSBmb3JtdWxhIHVzaW5nIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dHMsIHRoZW4gZW1pdHNcbiAqIHRoZSBvdXRwdXQgb2YgdGhhdCBmb3JtdWxhLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbWJpbmVMYXRlc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGNvbWJpbmVzIHRoZSB2YWx1ZXMgZnJvbSBhbGwgdGhlIE9ic2VydmFibGVzIHBhc3NlZCBhc1xuICogYXJndW1lbnRzLiBUaGlzIGlzIGRvbmUgYnkgc3Vic2NyaWJpbmcgdG8gZWFjaCBPYnNlcnZhYmxlIGluIG9yZGVyIGFuZCxcbiAqIHdoZW5ldmVyIGFueSBPYnNlcnZhYmxlIGVtaXRzLCBjb2xsZWN0aW5nIGFuIGFycmF5IG9mIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGZyb20gZWFjaCBPYnNlcnZhYmxlLiBTbyBpZiB5b3UgcGFzcyBgbmAgT2JzZXJ2YWJsZXMgdG8gb3BlcmF0b3IsXG4gKiByZXR1cm5lZCBPYnNlcnZhYmxlIHdpbGwgYWx3YXlzIGVtaXQgYW4gYXJyYXkgb2YgYG5gIHZhbHVlcywgaW4gb3JkZXJcbiAqIGNvcnJlc3BvbmRpbmcgdG8gb3JkZXIgb2YgcGFzc2VkIE9ic2VydmFibGVzICh2YWx1ZSBmcm9tIHRoZSBmaXJzdCBPYnNlcnZhYmxlXG4gKiBvbiB0aGUgZmlyc3QgcGxhY2UgYW5kIHNvIG9uKS5cbiAqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiBgY29tYmluZUxhdGVzdGAgYWNjZXB0cyBlaXRoZXIgYW4gYXJyYXkgb2YgT2JzZXJ2YWJsZXNcbiAqIG9yIGVhY2ggT2JzZXJ2YWJsZSBjYW4gYmUgcHV0IGRpcmVjdGx5IGFzIGFuIGFyZ3VtZW50LiBOb3RlIHRoYXQgYXJyYXkgb2ZcbiAqIE9ic2VydmFibGVzIGlzIGdvb2QgY2hvaWNlLCBpZiB5b3UgZG9uJ3Qga25vdyBiZWZvcmVoYW5kIGhvdyBtYW55IE9ic2VydmFibGVzXG4gKiB5b3Ugd2lsbCBjb21iaW5lLiBQYXNzaW5nIGVtcHR5IGFycmF5IHdpbGwgcmVzdWx0IGluIE9ic2VydmFibGUgdGhhdFxuICogY29tcGxldGVzIGltbWVkaWF0ZWx5LlxuICpcbiAqIFRvIGVuc3VyZSBvdXRwdXQgYXJyYXkgaGFzIGFsd2F5cyB0aGUgc2FtZSBsZW5ndGgsIGBjb21iaW5lTGF0ZXN0YCB3aWxsXG4gKiBhY3R1YWxseSB3YWl0IGZvciBhbGwgaW5wdXQgT2JzZXJ2YWJsZXMgdG8gZW1pdCBhdCBsZWFzdCBvbmNlLFxuICogYmVmb3JlIGl0IHN0YXJ0cyBlbWl0dGluZyByZXN1bHRzLiBUaGlzIG1lYW5zIGlmIHNvbWUgT2JzZXJ2YWJsZSBlbWl0c1xuICogdmFsdWVzIGJlZm9yZSBvdGhlciBPYnNlcnZhYmxlcyBzdGFydGVkIGVtaXR0aW5nLCBhbGwgdGhhdCB2YWx1ZXMgYnV0IGxhc3RcbiAqIHdpbGwgYmUgbG9zdC4gT24gdGhlIG90aGVyIGhhbmQsIGlzIHNvbWUgT2JzZXJ2YWJsZSBkb2VzIG5vdCBlbWl0IHZhbHVlIGJ1dFxuICogY29tcGxldGVzLCByZXN1bHRpbmcgT2JzZXJ2YWJsZSB3aWxsIGNvbXBsZXRlIGF0IHRoZSBzYW1lIG1vbWVudCB3aXRob3V0XG4gKiBlbWl0dGluZyBhbnl0aGluZywgc2luY2UgaXQgd2lsbCBiZSBub3cgaW1wb3NzaWJsZSB0byBpbmNsdWRlIHZhbHVlIGZyb21cbiAqIGNvbXBsZXRlZCBPYnNlcnZhYmxlIGluIHJlc3VsdGluZyBhcnJheS4gQWxzbywgaWYgc29tZSBpbnB1dCBPYnNlcnZhYmxlIGRvZXNcbiAqIG5vdCBlbWl0IGFueSB2YWx1ZSBhbmQgbmV2ZXIgY29tcGxldGVzLCBgY29tYmluZUxhdGVzdGAgd2lsbCBhbHNvIG5ldmVyIGVtaXRcbiAqIGFuZCBuZXZlciBjb21wbGV0ZSwgc2luY2UsIGFnYWluLCBpdCB3aWxsIHdhaXQgZm9yIGFsbCBzdHJlYW1zIHRvIGVtaXQgc29tZVxuICogdmFsdWUuXG4gKlxuICogSWYgYXQgbGVhc3Qgb25lIE9ic2VydmFibGUgd2FzIHBhc3NlZCB0byBgY29tYmluZUxhdGVzdGAgYW5kIGFsbCBwYXNzZWQgT2JzZXJ2YWJsZXNcbiAqIGVtaXR0ZWQgc29tZXRoaW5nLCByZXN1bHRpbmcgT2JzZXJ2YWJsZSB3aWxsIGNvbXBsZXRlIHdoZW4gYWxsIGNvbWJpbmVkXG4gKiBzdHJlYW1zIGNvbXBsZXRlLiBTbyBldmVuIGlmIHNvbWUgT2JzZXJ2YWJsZSBjb21wbGV0ZXMsIHJlc3VsdCBvZlxuICogYGNvbWJpbmVMYXRlc3RgIHdpbGwgc3RpbGwgZW1pdCB2YWx1ZXMgd2hlbiBvdGhlciBPYnNlcnZhYmxlcyBkby4gSW4gY2FzZVxuICogb2YgY29tcGxldGVkIE9ic2VydmFibGUsIGl0cyB2YWx1ZSBmcm9tIG5vdyBvbiB3aWxsIGFsd2F5cyBiZSB0aGUgbGFzdFxuICogZW1pdHRlZCB2YWx1ZS4gT24gdGhlIG90aGVyIGhhbmQsIGlmIGFueSBPYnNlcnZhYmxlIGVycm9ycywgYGNvbWJpbmVMYXRlc3RgXG4gKiB3aWxsIGVycm9yIGltbWVkaWF0ZWx5IGFzIHdlbGwsIGFuZCBhbGwgb3RoZXIgT2JzZXJ2YWJsZXMgd2lsbCBiZSB1bnN1YnNjcmliZWQuXG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGFjY2VwdHMgYXMgb3B0aW9uYWwgcGFyYW1ldGVyIGBwcm9qZWN0YCBmdW5jdGlvbiwgd2hpY2ggdGFrZXNcbiAqIGFzIGFyZ3VtZW50cyBhbGwgdmFsdWVzIHRoYXQgd291bGQgbm9ybWFsbHkgYmUgZW1pdHRlZCBieSByZXN1bHRpbmcgT2JzZXJ2YWJsZS5cbiAqIGBwcm9qZWN0YCBjYW4gcmV0dXJuIGFueSBraW5kIG9mIHZhbHVlLCB3aGljaCB3aWxsIGJlIHRoZW4gZW1pdHRlZCBieSBPYnNlcnZhYmxlXG4gKiBpbnN0ZWFkIG9mIGRlZmF1bHQgYXJyYXkuIE5vdGUgdGhhdCBgcHJvamVjdGAgZG9lcyBub3QgdGFrZSBhcyBhcmd1bWVudCB0aGF0IGFycmF5XG4gKiBvZiB2YWx1ZXMsIGJ1dCB2YWx1ZXMgdGhlbXNlbHZlcy4gVGhhdCBtZWFucyBkZWZhdWx0IGBwcm9qZWN0YCBjYW4gYmUgaW1hZ2luZWRcbiAqIGFzIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYWxsIGl0cyBhcmd1bWVudHMgYW5kIHB1dHMgdGhlbSBpbnRvIGFuIGFycmF5LlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db21iaW5lIHR3byB0aW1lciBPYnNlcnZhYmxlczwvY2FwdGlvbj5cbiAqIGNvbnN0IGZpcnN0VGltZXIgPSBSeC5PYnNlcnZhYmxlLnRpbWVyKDAsIDEwMDApOyAvLyBlbWl0IDAsIDEsIDIuLi4gYWZ0ZXIgZXZlcnkgc2Vjb25kLCBzdGFydGluZyBmcm9tIG5vd1xuICogY29uc3Qgc2Vjb25kVGltZXIgPSBSeC5PYnNlcnZhYmxlLnRpbWVyKDUwMCwgMTAwMCk7IC8vIGVtaXQgMCwgMSwgMi4uLiBhZnRlciBldmVyeSBzZWNvbmQsIHN0YXJ0aW5nIDAsNXMgZnJvbSBub3dcbiAqIGNvbnN0IGNvbWJpbmVkVGltZXJzID0gUnguT2JzZXJ2YWJsZS5jb21iaW5lTGF0ZXN0KGZpcnN0VGltZXIsIHNlY29uZFRpbWVyKTtcbiAqIGNvbWJpbmVkVGltZXJzLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICogLy8gTG9nc1xuICogLy8gWzAsIDBdIGFmdGVyIDAuNXNcbiAqIC8vIFsxLCAwXSBhZnRlciAxc1xuICogLy8gWzEsIDFdIGFmdGVyIDEuNXNcbiAqIC8vIFsyLCAxXSBhZnRlciAyc1xuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db21iaW5lIGFuIGFycmF5IG9mIE9ic2VydmFibGVzPC9jYXB0aW9uPlxuICogY29uc3Qgb2JzZXJ2YWJsZXMgPSBbMSwgNSwgMTBdLm1hcChcbiAqICAgbiA9PiBSeC5PYnNlcnZhYmxlLm9mKG4pLmRlbGF5KG4gKiAxMDAwKS5zdGFydFdpdGgoMCkgLy8gZW1pdCAwIGFuZCB0aGVuIGVtaXQgbiBhZnRlciBuIHNlY29uZHNcbiAqICk7XG4gKiBjb25zdCBjb21iaW5lZCA9IFJ4Lk9ic2VydmFibGUuY29tYmluZUxhdGVzdChvYnNlcnZhYmxlcyk7XG4gKiBjb21iaW5lZC5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqIC8vIExvZ3NcbiAqIC8vIFswLCAwLCAwXSBpbW1lZGlhdGVseVxuICogLy8gWzEsIDAsIDBdIGFmdGVyIDFzXG4gKiAvLyBbMSwgNSwgMF0gYWZ0ZXIgNXNcbiAqIC8vIFsxLCA1LCAxMF0gYWZ0ZXIgMTBzXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBwcm9qZWN0IGZ1bmN0aW9uIHRvIGR5bmFtaWNhbGx5IGNhbGN1bGF0ZSB0aGUgQm9keS1NYXNzIEluZGV4PC9jYXB0aW9uPlxuICogdmFyIHdlaWdodCA9IFJ4Lk9ic2VydmFibGUub2YoNzAsIDcyLCA3NiwgNzksIDc1KTtcbiAqIHZhciBoZWlnaHQgPSBSeC5PYnNlcnZhYmxlLm9mKDEuNzYsIDEuNzcsIDEuNzgpO1xuICogdmFyIGJtaSA9IFJ4Lk9ic2VydmFibGUuY29tYmluZUxhdGVzdCh3ZWlnaHQsIGhlaWdodCwgKHcsIGgpID0+IHcgLyAoaCAqIGgpKTtcbiAqIGJtaS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZygnQk1JIGlzICcgKyB4KSk7XG4gKlxuICogLy8gV2l0aCBvdXRwdXQgdG8gY29uc29sZTpcbiAqIC8vIEJNSSBpcyAyNC4yMTIyOTMzODg0Mjk3NTNcbiAqIC8vIEJNSSBpcyAyMy45Mzk0ODA5OTIwNTIwOVxuICogLy8gQk1JIGlzIDIzLjY3MTI1MzYyOTU5MjIyMlxuICpcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2V9XG4gKiBAc2VlIHtAbGluayB3aXRoTGF0ZXN0RnJvbX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dH0gb2JzZXJ2YWJsZTEgQW4gaW5wdXQgT2JzZXJ2YWJsZSB0byBjb21iaW5lIHdpdGggb3RoZXIgT2JzZXJ2YWJsZXMuXG4gKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dH0gb2JzZXJ2YWJsZTIgQW4gaW5wdXQgT2JzZXJ2YWJsZSB0byBjb21iaW5lIHdpdGggb3RoZXIgT2JzZXJ2YWJsZXMuXG4gKiBNb3JlIHRoYW4gb25lIGlucHV0IE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudHNcbiAqIG9yIGFuIGFycmF5IG9mIE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbcHJvamVjdF0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gcHJvamVjdCB0aGUgdmFsdWVzIGZyb21cbiAqIHRoZSBjb21iaW5lZCBsYXRlc3QgdmFsdWVzIGludG8gYSBuZXcgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9bnVsbF0gVGhlIElTY2hlZHVsZXIgdG8gdXNlIGZvciBzdWJzY3JpYmluZyB0b1xuICogZWFjaCBpbnB1dCBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiBwcm9qZWN0ZWQgdmFsdWVzIGZyb20gdGhlIG1vc3QgcmVjZW50XG4gKiB2YWx1ZXMgZnJvbSBlYWNoIGlucHV0IE9ic2VydmFibGUsIG9yIGFuIGFycmF5IG9mIHRoZSBtb3N0IHJlY2VudCB2YWx1ZXMgZnJvbVxuICogZWFjaCBpbnB1dCBPYnNlcnZhYmxlLlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSBjb21iaW5lTGF0ZXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8YW55IHwgT2JzZXJ2YWJsZUlucHV0PGFueT4gfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+PiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElTY2hlZHVsZXI+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGxldCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSID0gIG51bGw7XG4gIGxldCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBudWxsO1xuXG4gIGlmIChpc1NjaGVkdWxlcihvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBzY2hlZHVsZXIgPSA8SVNjaGVkdWxlcj5vYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JzZXJ2YWJsZXNbb2JzZXJ2YWJsZXMubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm9qZWN0ID0gPCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFI+b2JzZXJ2YWJsZXMucG9wKCk7XG4gIH1cblxuICAvLyBpZiB0aGUgZmlyc3QgYW5kIG9ubHkgb3RoZXIgYXJndW1lbnQgYmVzaWRlcyB0aGUgcmVzdWx0U2VsZWN0b3IgaXMgYW4gYXJyYXlcbiAgLy8gYXNzdW1lIGl0J3MgYmVlbiBjYWxsZWQgd2l0aCBgY29tYmluZUxhdGVzdChbb2JzMSwgb2JzMiwgb2JzM10sIHByb2plY3QpYFxuICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkob2JzZXJ2YWJsZXNbMF0pKSB7XG4gICAgb2JzZXJ2YWJsZXMgPSA8QXJyYXk8T2JzZXJ2YWJsZTxhbnk+Pj5vYnNlcnZhYmxlc1swXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKG9ic2VydmFibGVzLCBzY2hlZHVsZXIpLmxpZnQobmV3IENvbWJpbmVMYXRlc3RPcGVyYXRvcjxULCBSPihwcm9qZWN0KSk7XG59Il19