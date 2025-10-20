### Leetcode 2650 (Hard): Design Cancellable Function [Practice](https://leetcode.com/problems/design-cancellable-function)

### Description  
Design a function called **cancellable** that wraps around a generator yielding promises (asynchronous tasks) and enables cancellation.  
- The function accepts a generator. It yields promises and expects their resolved values.
- The **cancellable** function must return:
  1. A **cancel** callback that can be invoked to cancel the ongoing sequence.
  2. A **promise** reflecting the generator's run: it resolves with the generator's return value if all completes; rejects with "Cancelled" if cancelled; rejects with any error thrown inside the generator.

Key behaviors:
- Each yielded promise is awaited. If cancel is called, the sequence is interrupted and the promise rejects with "Cancelled".
- If the generator itself throws (except on "Cancelled" captured internally), the outer promise rejects with that error.

### Examples  

**Example 1:**  
Input:  
Generator:
```python
def tasks():
    val = yield Promise_resolve(2 + 2)
    yield Promise_delay(100)  # simulate wait
    return val + 1
```
Code:
```python
cancel, promise = cancellable(tasks())
promise.then(print)     # prints 5 after 100ms
```
Output: `5`  
*Explanation: The generator yields 4, waits 100ms, then returns 5.*

**Example 2:**  
Input:  
Same generator as above.  
Code:
```python
cancel, promise = cancellable(tasks())
setTimeout(cancel, 50)
promise.catch(print)    # prints "Cancelled" at t=50ms
```
Output: `"Cancelled"`  
*Explanation: cancel is invoked while waiting, causing the promise to reject with "Cancelled".*

**Example 3:**  
Input:  
Generator:
```python
def fail():
    yield Promise_resolve(1)
    raise Exception("Some error")
```
Code:
```python
cancel, promise = cancellable(fail())
promise.catch(print)    # prints "Some error"
```
Output: `"Some error"`  
*Explanation: The generator raises an error, so the promise is rejected with that error.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about controlling async flow in Python/JS using generators: the function yields promises and resumes when those resolve.  
- **Brute-force:** Await each yielded promise sequentially; return when done. But no way to "cancel" in-flight.
- **Optimal:** We need a way to “race” each yielded promise with an internal "cancelPromise"—if cancel is called, the process halts and notifies the generator.  
- When cancel is called, we force the generator to receive a "Cancelled" error via throw.
- If the generator handles the "Cancelled" error internally (i.e., via try/except), its next value can resolve the outer promise; otherwise, the outer promise rejects with "Cancelled".
- We must carefully propagate exceptions, and ensure cancel is idempotent and doesn’t create unhandled promise rejections.

Trade-off: Using **Promise.race** allows prompt cancellation without resorting to flag checks or modifications to the yielded promises.

### Corner cases to consider  
- The generator completes before cancel is ever called.
- The generator listens for "Cancelled" and returns its own value.
- The generator yields no promises at all.
- The cancel function is called after generator finishes (should do nothing).
- Repeated cancel calls.
- Generator throws an exception not related to cancellation.
- Generator yields rejected promises.

### Solution

```python
def cancellable(generator):
    """
    Wrap a generator yielding awaitable objects to allow cancellation.
    Returns (cancel, promise) where:
      - cancel(): cancels the flow and throws into the generator.
      - promise: resolves to the generator's final return or rejects if cancelled or exception thrown.
    """
    import asyncio

    cancelled = False  # Flag for external cancellation

    loop = asyncio.get_event_loop()
    cancel_future = loop.create_future()

    def cancel():
        nonlocal cancelled
        if not cancelled:
            cancelled = True
            if not cancel_future.done():
                cancel_future.set_exception(Exception("Cancelled"))

    async def run():
        try:
            value = None
            exc = None
            gen = generator  # assumed: already a generator object
            while True:
                try:
                    if exc:
                        yielded = gen.throw(exc)
                        exc = None
                    else:
                        yielded = gen.send(value)
                except StopIteration as si:
                    return si.value
                # Wait for either the yielded promise or cancellation
                try:
                    value = await asyncio.wait_for(
                        asyncio.shield(yielded),
                        timeout=None
                    ) if not cancelled else await cancel_future
                except Exception as e:
                    if cancelled and isinstance(e, Exception) and str(e) == "Cancelled":
                        try:
                            gen.throw(e)
                        except StopIteration as si:
                            return si.value
                        except Exception as inner:
                            raise inner
                        raise e
                    else:
                        exc = e
        except Exception as e:
            raise e

    promise = asyncio.ensure_future(run())
    return cancel, promise
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of yields in the generator. Each async step is awaited sequentially; cancel adds O(1) work.
- **Space Complexity:** O(1) extra space, aside from generator and promise stack. No data structures grow with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support multiple independent cancellations or “pauses”?
  *Hint: Consider returning a “pause/resume” API and manipulating the flow control/state.*

- How would you handle cancellation if the async tasks cannot themselves be cancelled?
  *Hint: Can you make the promises themselves cancellable or notify that their results are no longer wanted?*

- Can you enable progress reporting or status updates as the generator runs?
  *Hint: Add callback hooks after each yield’s task completes.*

### Summary
This problem showcases a **control flow/cancellation pattern** for generators emitting async work, a common real-world pattern in robust async task runners and coroutines.  
Key takeaways:  
- Using a “promise race” between the intended work and a cancellation notification makes cancellation handling **reactive and prompt**.
- This applies in orchestrating network requests, async pipelines, event handlers, and more wherever cooperative cancellation or pausing/resuming is desired.


### Flashcard
Race each yielded promise with a cancelPromise—when cancel() is called, reject the race and throw "Cancelled" to the generator immediately.

### Tags

### Similar Problems
- Generate Fibonacci Sequence(generate-fibonacci-sequence) (Easy)
- Nested Array Generator(nested-array-generator) (Medium)