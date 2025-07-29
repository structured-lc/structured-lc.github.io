### Leetcode 672 (Medium): Bulb Switcher II [Practice](https://leetcode.com/problems/bulb-switcher-ii)

### Description  
You're given **n bulbs** initially turned on (meaning all bulbs are lit). There are 4 different buttons you can press, and you can press up to **m times** (order matters):
- Button 1: Flip all the bulbs.
- Button 2: Flip bulbs at even positions.
- Button 3: Flip bulbs at odd positions.
- Button 4: Flip bulbs at positions of the form 3k+1 (i.e., bulbs at indices 1, 4, 7, ...).

The goal is to find how many **different possible bulb states** are there after pressing the buttons up to m times, for any n and m.

### Examples  

**Example 1:**  
Input: `n = 1, m = 1`  
Output: `2`  
*Explanation: Two possible states: [off], [on]. One press can flip the bulb or not.*

**Example 2:**  
Input: `n = 2, m = 1`  
Output: `3`  
*Explanation:  
- Press no buttons → [on, on]  
- Press Button 1 → [off, off]  
- Press Button 2 → [on, off] (if first is odd, second even)  
(Pressing Button 3 would give [off, on], but flipping buttons 1/3 is the same as flipping 2, so total is 3 unique.)*

**Example 3:**  
Input: `n = 3, m = 1`  
Output: `4`  
*Explanation:  
- [on, on, on]  
- [off, off, off] (Button 1)  
- [off, on, off] (Button 2)  
- [on, off, on] (Button 3)*

### Thought Process (as if you’re the interviewee)  
My first instinct is brute force: try all possible button press sequences and count unique outcomes.  
Each of the 4 buttons can be pressed or not, and there are up to m presses, so total sequences would be 4ᵐ, which is impractical for large m.

But notice:
- After n > 3, additional bulbs behave like the first three, due to button effects repeating in pattern.
- For any n, we only need to track up to the first three bulbs; larger n doesn't add new unique effects.  
Thus, I can reduce the scenario to n = min(n, 3).  
For each value of m (and n), I can precompute the number of unique states possible.

The math solution is based on the following patterns:
- If m == 0 ⇒ Only initial state possible ⇒ 1 state
- If n == 1: [on], can only be [on], [off] ⇒ min(2, m+1)
- If n == 2, m == 1: [on,on], [off,off], [on,off] ⇒ 3
- Basically, for all possible presses combinations, I count unique resulting states—it's always capped for n ≤ 3.

This reduces the problem to a constant-time table lookup.

### Corner cases to consider  
- n = 0 (no bulbs): Should return 1 (no bulb to flip, only “empty” state)
- m = 0 (no moves): Only one state, initial "all on"
- Large n (n > 3): Only 3 bulbs matter for number of states
- Large m: Does not matter, pattern saturates after m ≥ 3.

### Solution

```python
def flipLights(n: int, m: int) -> int:
    # Only first 3 bulbs affect the outcome due to operation overlaps
    if m == 0:
        return 1
    if n == 1:
        return 2
    if n == 2:
        if m == 1:
            return 3
        return 4
    # n >= 3
    if m == 1:
        return 4
    if m == 2:
        return 7
    return 8
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Constant time; no matter the input size, always same computation.
- **Space Complexity:** O(1) — No extra space is used apart from a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were more types of switches?
  *Hint: Think about how button patterns interact and whether the problem still reduces to a small state.*

- Can you list or generate all possible unique final states?
  *Hint: Try bitmasking or small simulation for n ≤ 3.*

- What if you have to return the button press sequence for any target state?
  *Hint: Backtracking or BFS for small m and n.*

### Summary
This problem is a classic **state counting with symmetry and patterns**, where brute force is quickly replaced with mathematical observations. Recognizing that only the first three bulbs ever matter due to the periodicity of button effects is the main insight. The coding pattern used is "reduce problem to small constant size + use table/conditions"—a powerful and common technique for optimizing combinatorial toggle/counting scenarios.