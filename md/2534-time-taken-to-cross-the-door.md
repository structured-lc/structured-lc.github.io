### Leetcode 2534 (Hard): Time Taken to Cross the Door [Practice](https://leetcode.com/problems/time-taken-to-cross-the-door)

### Description  
Given `n` persons, each wants to enter (`state[i]=0`) or exit (`state[i]=1`) through a door at times specified by `arrival[i]`. Each crossing takes 1 second and the door can serve only one person at a time. When both enter and exit queues have candidates at the current time, **priority rules** apply:  
- If the door was used to exit at the previous second (or unused before), exiting has priority.  
- If it was used to enter, entering has priority.  
Return an array `answer`, where `answer[i]` is the exact second the iᵗʰ person crosses.

### Examples  

**Example 1:**  
Input: `arrival = [0,1,1,2,4]`, `state = [0,1,0,0,1]`  
Output: `[0,3,1,2,4]`  
*Explanation:*
- Time 0: Person 0 arrives (enter), crosses immediately → answer=0.
- Time 1: Persons 1 (exit) and 2 (enter) arrive:
  - Previous action: enter; so priority: enter. Person 2 crosses at 1 → answer[2]=1.
- Time 2: Person 3 (enter) arrives, only one present, crosses → answer[3]=2.
- Time 3: Person 1 (exit) is still waiting. Only one person, crosses → answer[1]=3.
- Time 4: Person 4 (exit) arrives and crosses → answer[4]=4.

**Example 2:**  
Input: `arrival = [2,2,2]`, `state = [0,1,0]`  
Output: `[2,3,4]`  
*Explanation:*
- Time 2: Three people–two want to enter (0,2) and one to exit (1). Previous unused, so exit has priority. Person 1 (exit) crosses at 2.
- Remaining: Persons 0 and 2 enter, one per second: at 3 and 4.

**Example 3:**  
Input: `arrival = [0,1,1]`, `state = [1,1,0]`  
Output: `[0,1,2]`  
*Explanation:*
- Time 0: Person 0 arrives (exit), door unused, crosses immediately.
- Time 1: Persons 1 (exit) & 2 (enter) arrive:
    - Previous was exit: priority to exiting. Person 1 crosses at 1.
- Time 2: Person 2 (enter) crosses at 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  At every second, check who is available, simulate each person's crossing according to the rules. This approach is very slow: O(n·T), where T is total time.

- **Optimal:**  
  Use **two queues**: one for entering, one for exiting. Track `current_time`, and the action performed at the previous second (`last_action`).  
  - At each step, determine, by the rules:
      - Whether to serve the front of the enter or exit queue.
      - Maintain the crossing time per each person.
  - The solution is a simulation, but at each time step, we advance time to the earliest arrival or the next available action to minimize loops.

- **Trade-offs:**  
  This approach is O(n), simple, deterministic, easy to reason about for corner cases.

### Corner cases to consider  
- All arrivals at the same time.
- Only entries, or only exits.
- Gaps in arrivals (time jumps).
- Person arrives after a long period when the door was unused.
- First action must ensure exit has priority if door was unused.
- No one comes for several consecutive seconds.

### Solution

```python
from collections import deque

def timeTaken(arrival, state):
    n = len(arrival)
    enterQueue = deque()  # stores indices of those who want to enter
    exitQueue = deque()   # stores indices of those who want to exit
    for i in range(n):
        if state[i] == 0:
            enterQueue.append(i)
        else:
            exitQueue.append(i)
    
    result = [-1] * n
    current_time = 0
    last_action = -1  # -1: unused, 0: enter, 1: exit

    while enterQueue or exitQueue:
        candidates = []
        # Find front waiting candidates, if present, at the current_time
        enter_index = enterQueue[0] if enterQueue else None
        exit_index = exitQueue[0] if exitQueue else None

        can_enter = (enter_index is not None and arrival[enter_index] <= current_time)
        can_exit = (exit_index is not None and arrival[exit_index] <= current_time)

        if can_enter and can_exit:
            # Both queues have waiting people
            if last_action == 1 or last_action == -1:
                # Exit priority
                p = exitQueue.popleft()
                result[p] = current_time
                last_action = 1
            else:
                # Enter priority
                p = enterQueue.popleft()
                result[p] = current_time
                last_action = 0
        elif can_exit:
            p = exitQueue.popleft()
            result[p] = current_time
            last_action = 1
        elif can_enter:
            p = enterQueue.popleft()
            result[p] = current_time
            last_action = 0
        else:
            # Nobody at current time; find next arrival time
            next_arrival = float('inf')
            if enter_index is not None:
                next_arrival = min(next_arrival, arrival[enter_index])
            if exit_index is not None:
                next_arrival = min(next_arrival, arrival[exit_index])
            current_time = next_arrival
            last_action = -1
            continue  # check again at the new time
        current_time += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each person is processed exactly once as they're removed from their respective queues.
- **Space Complexity:** O(n).  
  Extra storage for `enterQueue`, `exitQueue`, and `result` arrays, each up to n size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each crossing takes a variable number of seconds per person?  
  *Hint: You'd have to handle variable blocking times and update when the door is available.*

- What if there are multiple doors, each serving independently?  
  *Hint: Simulate each door with its own queues and manage assignment policies.*

- How would you adapt if arrival times could decrease (not sorted input)?  
  *Hint: Must sort arrival events or use a priority queue to track next available person correctly.*

### Summary
This problem is a **simulation using two queues** with **priority rules**—a classic queue simulation.  
The approach is general for single-resource contention problems; this pattern shows up in OS process scheduling, railway crossing, or server-throttling scenarios.  
Understanding how to efficiently simulate real-world sequential events is an important interview pattern, and handling edge cases (equal arrivals, unused gaps, right initial states) is key.