### Leetcode 359 (Easy): Logger Rate Limiter [Practice](https://leetcode.com/problems/logger-rate-limiter)

### Description  
Design a logger system that receives a stream of messages along with their timestamps. For every unique message, the logger should print that message only if it hasn’t been printed in the past 10 seconds; otherwise, it should be ignored (throttled).  
Each message comes with a timestamp in seconds, and timestamps are non-decreasing.  
Implement a class `Logger` with:
- `shouldPrintMessage(int timestamp, string message)` — returns **True** if the message should be printed at `timestamp`, **False** if it should be skipped due to the 10-second rule.

### Examples  

**Example 1:**  
Input: `Logger(); shouldPrintMessage(1, "foo")`  
Output: `True`  
*Explanation: "foo" hasn't been printed before. Print it now.*

**Example 2:**  
Input: `shouldPrintMessage(2, "bar")`  
Output: `True`  
*Explanation: "bar" hasn't been printed before. Print it now.*

**Example 3:**  
Input: `shouldPrintMessage(3, "foo")`  
Output: `False`  
*Explanation: "foo" was printed at 1, and 3 - 1 < 10. Don’t print.*

**Example 4:**  
Input: `shouldPrintMessage(11, "foo")`  
Output: `True`  
*Explanation: "foo" was last printed at 1. Now 11 - 1 = 10, so print it.*

### Thought Process (as if you’re the interviewee)  
First, I want to efficiently check when a given message was last printed.  
- Brute-force: Keep every printed log, linearly search backwards for each call — but this is much too slow (O(N) per call).
- Instead, I can use a **dictionary** (hashmap):  
  - Keys = message strings,  
  - Values = last timestamp printed.  
This gives O(1) lookup/insert for each message.  
For every `shouldPrintMessage` call, I check:
- If message isn’t in the map, print and store timestamp.
- If message is in the map, check the interval:
  - If currentTs - lastTs ≥ 10, update and print.
  - Else, ignore.

Using a dictionary means old logs are automatically removed or overwritten — no memory leak.

### Corner cases to consider  
- Message repeats at the **exact 10 second** interval: should be allowed.
- Multiple messages with same timestamp.
- Large influx of unique messages (check scalability).
- Messages arriving in strictly increasing or the same timestamp.
- Nonexistent messages (never seen before).
- Long time gaps between repeated messages.

### Solution

```python
class Logger:
    def __init__(self):
        # Stores the last printed timestamp for each unique message
        self.last_printed = {}

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        # If the message has never been printed, print it and remember timestamp
        if message not in self.last_printed:
            self.last_printed[message] = timestamp
            return True
        
        # If at least 10 seconds have passed since last print, print again
        if timestamp - self.last_printed[message] >= 10:
            self.last_printed[message] = timestamp
            return True
        
        # Else, too soon
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per `shouldPrintMessage` call (dictionary lookup, insert are O(1))
- **Space Complexity:** O(U), where U is the number of unique messages seen (one entry per unique message in dictionary)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle memory usage if the number of unique messages was extremely large?
  *Hint: Can you clean up old message entries or expire old logs?*

- What if timestamps can **go backwards** (are not monotonic)?
  *Hint: Carefully check logic; current approach requires monotonic timestamps.*

- Suppose the interval is not fixed (dynamically specified per message)?
  *Hint: How to generalize the solution for different interval rules?*

### Summary
This problem leverages the **hashmap pattern** for O(1) cache-style lookup and update, tracking last event occurrence per key.  
It’s analogous to rate-limiting, cache expiration, and “recently seen” patterns — common in logging, streaming, and load balancer design.  
The solution is simple, efficient, and easily extended if the requirements evolve.