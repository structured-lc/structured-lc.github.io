### Leetcode 2694 (Medium): Event Emitter [Practice](https://leetcode.com/problems/event-emitter)

### Description  
Implement an **EventEmitter** class that supports subscribing to named events, emitting events with arguments, and unsubscribing callbacks.  
- You can subscribe a callback function to a specific event name.  
- When the event is emitted, all callbacks for that event are called **in order**, with the provided arguments.  
- `subscribe` returns an object with an `unsubscribe` method: calling it removes that specific callback from the event, so it no longer fires.  
- Events may have any number of subscribers.

### Examples  

**Example 1:**  
Input=`["EventEmitter","emit","subscribe","emit","emit","emit"]`,  
`[[],["firstEvent",[]],["firstEvent", fn1],["firstEvent",[]],["firstEvent",[1]],["secondEvent",[2]]]`  
Output=`[null,[],{"unsubscribe": fn},[fn1()], [fn1(1)], []]`  
*Explanation:*  
- Create emitter.
- Emit "firstEvent" (no subscribers) → []  
- Subscribe fn1 to "firstEvent" → return unsubscribe object  
- Emit "firstEvent" → [fn1()]  
- Emit "firstEvent" with [1] → [fn1(1)]  
- Emit "secondEvent" (no subscribers) → []

**Example 2:**  
Input=`["EventEmitter","subscribe","subscribe","emit","emit"]`,  
`[[], ["event", fn1], ["event", fn2], ["event",[]], ["event",]]`  
Output=`[null, {"unsubscribe": fn}, {"unsubscribe": fn}, [fn1(), fn2()], [fn1(42), fn2(42)]]`  
*Explanation:*  
Both fn1 and fn2 subscribed to "event"; emit calls both in order of subscription.

**Example 3:**  
Input=`["EventEmitter","subscribe","emit","unsubscribe","emit"]`,  
`[[], ["foo", fn], ["foo",[5]], [unsubscribeObj], ["foo",]]`  
Output=`[null, {"unsubscribe": fn}, [fn(5)], null, []]`  
*Explanation:*  
- Subscribe fn to "foo".
- Emit "foo" with [5] → [fn(5)]  
- Unsubscribe fn  
- Emit "foo" → [] (fn was removed)


### Thought Process (as if you’re the interviewee)  
I'd start with a class holding a mapping from each event name to a list of subscribers (callbacks).  
- **subscribe(event, fn):** Add fn to the event list. Return an unsubscribe method that removes only this fn instance.  
- **emit(event, args):** Call each callback for that event in the order they were added, passing args. Collect return values.  
- **unsubscribe():** Remove the callback from its event's list; do nothing if already removed.  

Brute-force, I'd simply search for fn in the list and remove it when unsubscribing. Since unsubscribes are rare, this is efficient enough, and fits the problem's simplicity.  
Main tradeoff: If very frequent subscribe/unsubscribe happens, using linked lists or maps could make deletes faster, but that seems unnecessary here.

### Corner cases to consider  
- Emitting an event name with no subscribers (should return [])  
- Subscribing the same callback multiple times (unsubscribe removes only one instance)  
- Calling unsubscribe multiple times (should not error)  
- Events with multiple different callbacks  
- Emitting with zero or multiple arguments  
- Unsubscribing while iterating (the list should safely handle modifications during emit)  
- Emitting an unknown event name (should return [])


### Solution

```python
class EventEmitter:
    def __init__(self):
        # Events: eventName -> list of (callback) functions
        self.events = {}

    def subscribe(self, eventName, callback):
        # Ensure the event has a list of subscribers
        if eventName not in self.events:
            self.events[eventName] = []
        subscribers = self.events[eventName]
        subscribers.append(callback)
        
        def unsubscribe():
            # Remove *only* the first matching callback reference
            if callback in self.events.get(eventName, []):
                self.events[eventName].remove(callback)

        return {"unsubscribe": unsubscribe}

    def emit(self, eventName, args=[]):
        # Return empty list if event has no subscribers
        if eventName not in self.events:
            return []
        result = []
        # Use a copy of the callback list to avoid issues if callbacks unsubscribe themselves during emit
        for callback in list(self.events[eventName]):
            result.append(callback(*args))
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **subscribe:** O(1), simply appends to a list.  
  - **emit:** O(k), where k = number of callbacks for the event (calls each one once).  
  - **unsubscribe:** O(k), must search through the list to remove the first matching callback.

- **Space Complexity:**  
  - O(m + k) where m = number of event names stored, and k = total callbacks across all events.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you support once-only listeners (callbacks that auto-unsubscribe after the first call)?  
  *Hint: Wrap the callback or track a flag indicating if it should be called again.*

- Can you make unsubscribe more efficient if there are thousands of listeners per event?  
  *Hint: Consider using a linked list or a map for O(1) removals.*

- What if subscribers want to know if they are already subscribed or prevent duplicate subscriptions?  
  *Hint: Maintain a set of unique callback references per event name.*

### Summary
This problem models the **publish-subscribe** pattern, common in UI toolkits and event-driven programming.  
The core idea is a mapping from event names to lists of callbacks, efficiently supporting add, remove, and fire operations.  
Variations of this design appear in Node.js's event emitters, DOM event targets, and message buses.  
Key implementation choices:  
- Managing subscriber lists  
- Handling safe element removal  
- Preserving order and supporting robust unsubscribe logic  
Pattern is useful for decoupling code, plugin architectures, or any scenario needing observer/listener behavior.

### Tags

### Similar Problems
