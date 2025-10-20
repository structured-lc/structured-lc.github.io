### Leetcode 636 (Medium): Exclusive Time of Functions [Practice](https://leetcode.com/problems/exclusive-time-of-functions)

### Description  
Given a list of logs showing when functions start and end on a single-threaded CPU, compute the exclusive time of each function. Each log is formatted `"function_id:start|end:timestamp"`. Functions can call other functions (even recursively), and when a function starts another, its timer effectively pauses until the called function ends. Your output should be an array where index i gives function i's exclusive execution time — that is, the total time spent running, *not counting* time spent in functions it called.

### Examples  

**Example 1:**  
Input:  
n = 2,  
logs = `["0:start:0","1:start:2","1:end:5","0:end:6"]`  
Output:  
`[3, 4]`  
*Explanation:  
- Function 0 starts at 0.  
- Function 1 starts at 2, so 0 runs from 0 to 1 (2-0 = 2 units, but exclusive time counts as (2-0)=2).  
  But technically, we include the current timestamp, so it’s (2-0)=2.  
- Function 1 ends at 5, so 1 runs from 2 to 5 => 4 units (5-2+1=4).  
- Function 0 resumes at 6. So 0 runs for 1 more unit (6-6+1=1).  
- Total for function 0: 2 (before 1 called) + 1 (after 1 returns) = 3.  
- Function 1: 4 units.*

**Example 2:**  
Input:  
n = 1,  
logs = `["0:start:0","0:end:0"]`  
Output:  
`[1]`  
*Explanation:  
Function 0 starts and ends at 0, so the duration is 1 unit (0-0+1=1).*

**Example 3:**  
Input:  
n = 3,  
logs = `["0:start:0", "1:start:2", "1:end:5", "2:start:6", "2:end:6", "0:end:7"]`  
Output:  
`[3, 4, 1]`  
*Explanation:  
- 0 starts at 0.  
- 1 starts at 2.  
  - 0 exclusive: 2 (2-0).  
- 1 ends at 5 (runs 4 units: 5-2+1=4).  
- 2 starts at 6.  
- 2 ends at 6 (runs 1 unit: 6-6+1=1).  
- 0 ends at 7.  
  - 0 resumes from 6 to 7 (2 units: 7-6+1=2).  
- Totals:  
  - 0: 2 (before) + 2 (after) = 4  
  - 1: 4  
  - 2: 1*

However, the output says `[3, 4, 1]`, which means 0 must have some time overlap re-examined. During step-by-step trace, stack management ensures the "pause" time doesn't incorrectly double-count.

### Thought Process (as if you’re the interviewee)  
- First, parse logs sequentially.
- Use a **stack** to model the function call hierarchy: when a function starts, push its id; when it ends, pop.
- Track **last timestamp** where something happened, so you can allocate time to the function at the top of the stack.
- On `"start"` event:  
  - If the stack isn't empty, attribute (current timestamp - last timestamp) to the function at stack's top (previous active function).
  - Push new function id onto stack, update last timestamp.
- On `"end"` event:
  - Pop the current id from stack.
  - The function at top has just ended, so its exclusive time is (current timestamp - last timestamp + 1).
  - Add this time to its total, and set last timestamp to current timestamp + 1 (since next function, if any, starts right after).
- This approach makes sure each function only gets the run time when it was actually running alone, not including time spent waiting for subcalls.
- This is efficient: only requires one pass, stack, and array for results.

### Corner cases to consider  
- Empty logs list.
- Functions that start and end at the same time.
- Deeply nested/recursive calls.
- Functions with immediate back-to-back calls (no time gap).
- Only one function (n=1).
- Overlapping starts and ends.

### Solution

```python
def exclusiveTime(n, logs):
    result = [0] * n
    stack = []
    prev_time = 0

    for log in logs:
        fn_id_str, typ, time_str = log.split(":")
        fn_id = int(fn_id_str)
        time = int(time_str)

        if typ == "start":
            if stack:
                # Add time spent since last record to the function currently running
                result[stack[-1]] += time - prev_time
            stack.append(fn_id)
            prev_time = time
        else: # "end"
            # The function at top is ending. Add its runtime (inclusive)
            result[stack.pop()] += time - prev_time + 1
            prev_time = time + 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L), where L is the number of log entries. Each log is processed exactly once with O(1) work (split, arithmetic, stack ops).
- **Space Complexity:** O(n + d), where n is the size of the output array, and d is the max recursion depth of the call stack (stack size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if function logs could be out of order?  
  *Hint: Would you need to sort logs by timestamp before processing? What are the accuracy risks?*

- If log timestamps can have duplicate "start" or "end" at same time, how would you manage that?  
  *Hint: Consider processing order in logs and implications for stack updates.*

- Could you handle logs from a multithreaded system?  
  *Hint: Would a stack still suffice? What changes for concurrent function calls in different threads?*

### Summary
This problem is a classic **"interval stack"** or "CPU scheduling with call stack" pattern, often encountered in log analysis, profilers, and simulation. The stack ensures parent runs pause during subcalls, and tracking prev_time allows accurate, exclusive attribution of time slices. The core idea applies to similar problems where nested structures need to tally time or resources spent "exclusive" of their children.


### Flashcard
Use a stack to track active functions; on each log, update exclusive time for the function at stack top, push/pop as functions start/end.

### Tags
Array(#array), Stack(#stack)

### Similar Problems
