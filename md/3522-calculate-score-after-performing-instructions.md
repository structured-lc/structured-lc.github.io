### Leetcode 3522 (Medium): Calculate Score After Performing Instructions [Practice](https://leetcode.com/problems/calculate-score-after-performing-instructions)

### Description  
You are given two arrays of the same length n: **instructions** (of strings: "add" or "jump") and **values** (of integers).  
You start at index 0 with a **score** of 0.  
- If instructions[i] == "add":  
  - Add values[i] to the **score**.
  - Move to the next instruction (i + 1).
- If instructions[i] == "jump":
  - Move to instruction at index (i + values[i]) with **no change** to the score.

The process ends **immediately** if:
- You go out of bounds (i ≥ n or i < 0), or
- You attempt to revisit an instruction you’ve already executed (do not execute it again).

Return the score at the end.

---

### Examples  

**Example 1:**  
Input:  
instructions = `["jump","add","add","jump","add","jump"]`,  
values = `[2,1,3,1,-2,-3]`  
Output: `1`  
*Explanation:  
Start i=0, score=0  
- 0: "jump", jump to i=0+2=2  
- 2: "add", score += 3 → 3, next i=3  
- 3: "jump", jump to i=3+1=4  
- 4: "add", score += -2 → 1, next i=5  
- 5: "jump", jump to i=5+(-3)=2  
- 2: already visited, stop.  
Final score = 1.*

**Example 2:**  
Input:  
instructions = `["add","add"]`,  
values = `[5,10]`  
Output: `15`  
*Explanation:  
- 0: "add", score += 5 → 5, next i=1  
- 1: "add", score += 10 → 15, next i=2  
- 2: out of bounds, stop.  
Final score = 15.*

**Example 3:**  
Input:  
instructions = `["jump","add","jump"]`,  
values = `[1,100,-1]`  
Output: `0`  
*Explanation:  
- 0: "jump", jump to i=1  
- 1: "add", score += 100 → 100, next i=2  
- 2: "jump", jump to i=2+(-1)=1  
- 1: already visited, stop.  
Final score = 100 (but next step was not taken).*

---

### Thought Process (as if you’re the interviewee)  
First, the problem is about simulating a process where you move along an instruction list by either adding to a score or jumping to another index.  
A naive approach is direct simulation:
- Use a variable for your **current index** and for your **score**.
- Use a boolean array or set to **track visited instructions** to catch cycles.
- At each step, check if current index is already visited. If so, break and return.
- Else, mark it as visited, perform the instruction, and update index/score.

Optimize for time: Since we process each instruction at most once, this direct simulation is O(n) time.

Optimize for space: We need O(n) extra to track visited instructions.

No real data structure tricks needed; the key is careful simulation with cycle detection.

---

### Corner cases to consider  
- n = 0: Empty instructions/values.
- All "add", no "jump": should just add all, stop at n.
- All "jump" (could cause cycle quickly or go out of bounds on the first jump).
- Negative jump (could loop or instantly go out of bounds).
- Immediate revisit: e.g., jump that sends you to itself.
- values with zero (for jump, jumps to the same place = instant cycle).
- values with negative numbers.

---

### Solution

```python
def calculateScore(instructions, values):
    n = len(instructions)
    score = 0
    visited = [False] * n  # Track instructions we've done
    i = 0  # Start at first instruction

    while 0 <= i < n and not visited[i]:
        visited[i] = True
        if instructions[i] == "add":
            score += values[i]
            i += 1
        elif instructions[i] == "jump":
            i += values[i]
        else:
            # Should not happen in valid input
            break

    return score
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each instruction is processed at most once. Loop runs ≤ n times since we stop on revisit or leaving bounds.
- **Space Complexity:** O(n)  
  For the visited array of size n. Score, index variables are O(1).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to return the full **path** of visited indices?   
  *Hint: Track the visited order in a list.*
  
- How would you detect whether a **cycle** (infinite loop) is possible?  
  *Hint: If you revisit before going out of bounds without ever hitting a new instruction.*

- Suppose "jump" could randomly go both left and right (values[i] could be negative or positive). How do negative jumps affect your logic?  
  *Hint: Already handled, but requires careful test case coverage for cycles and out-of-bounds.*

---

### Summary
This problem demonstrates direct **simulation** with **cycle detection** using a visited array, a very frequent pattern for problems on jump-based board games, robot or infinite runner simulations, and others that require carefully stepping through a state machine or process.  
Techniques here (O(n) simulation, visited tracking) are useful for problems involving cycles and process termination.


### Flashcard
Simulate with a visited set to detect cycles; track current index and score, updating based on instruction type until cycle or end.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Simulation(#simulation)

### Similar Problems
