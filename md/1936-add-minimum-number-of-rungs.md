### Leetcode 1936 (Medium): Add Minimum Number of Rungs [Practice](https://leetcode.com/problems/add-minimum-number-of-rungs)

### Description  
You are given a **strictly increasing** list of integers, `rungs`, where each number represents the height of a rung on a ladder. Starting from height 0 (the floor), you want to climb to the last rung. You can climb up to a maximum vertical distance of `dist` in one step, between rungs (or from the ground to the first rung). If the distance to the next rung ever exceeds `dist`, you are allowed to add rungs at any positive integer height (as long as there's no rung at that height already) to make the climb possible.  
Return the **minimum number of rungs** you must add so every climb from your current position to the next rung is at most `dist`.

---

### Examples  

**Example 1:**  
Input: `rungs = [1,3,5,10]`, `dist = 2`  
Output: `2`  
*Explanation: From 5 to 10, gap is 5, need to add rungs at 7 and 9 (or two anywhere in between, e.g. at 7 and 8). [1, 3, 5, 7, 9, 10] works.*

**Example 2:**  
Input: `rungs = [3,6,8,10]`, `dist = 3`  
Output: `0`  
*Explanation: All the rung distances are at most 3 (from 0→3 is 3, 3→6 is 3, 6→8 is 2, 8→10 is 2), so you don’t need to add any rungs.*

**Example 3:**  
Input: `rungs = [3,4,6,7]`, `dist = 2`  
Output: `1`  
*Explanation: From 0→3 is 3 (>2). You need to add a rung at 1. Then each step is ≤2.*

---

### Thought Process (as if you’re the interviewee)  
- First, observe that **every gap between two consecutive reachable points (including from ground 0 to the first rung) must be ≤dist**.
- For each consecutive pair `(prev, curr)`, if `curr - prev > dist`, you have to add rungs. The number to add is exactly the smallest integer \( k \) such that `(curr - prev) ≤ (k+1) × dist`, or equivalently ⌊(curr - prev - 1) / dist⌋.
- Brute force idea: For each gap, simulate climbing by repeatedly adding rungs at every `dist` step until you can reach `curr`. But this is inefficient for large distances.
- Optimization: For each gap, instead of simulating, **just compute the number of needed rungs mathematically** as described above. Use integer division for efficiency.
- **Trade-offs:** The optimal strategy is greedy – always fill the biggest leaps using as few rungs as possible. Time is O(n), and no extra space is needed.

---

### Corner cases to consider  
- rungs contains only one element, and the distance from 0 is greater than `dist`.
- Multiple large gaps, possibly requiring several added rungs.
- No rungs need to be added if all gaps are ≤dist.
- dist is 1, forcing rungs to be at every height.
- Large starting gap (from 0 to rungs).
- Consecutive rungs with gap = 1 (no rungs needed).

---

### Solution

```python
def addRungs(rungs, dist):
    added = 0           # Counter for additional rungs needed
    prev = 0            # Starting from the ground (height 0)
    for height in rungs:
        gap = height - prev
        if gap > dist:
            # Number of rungs to add in the current gap
            # Each rung divides the gap into steps of at most 'dist'
            # We need to fill up the difference except for the last jump
            added += (gap - 1) // dist
        prev = height
    return added
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rungs. We iterate once through the array.
- **Space Complexity:** O(1), only a few integer variables are used regardless of input size.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if rungs are **not strictly increasing**?
  *Hint: Consider duplicates or unordered input, and whether you need to preprocess the list.*

- How would you **output the actual positions** of all rungs after inserts?
  *Hint: Maintain a new list and simulate filling the gaps.*

- What if the allowed distance `dist` **changes at each step**?
  *Hint: How would you model dist as an array instead of a scalar?*

---

### Summary
This problem uses a **greedy, gap-filling strategy** that iterates over the differences between known rungs and mathematically inserts just enough rungs to ensure every step is ≤dist. This is a classic "minimally add to fill gaps" pattern, applicable in scheduling, bandwidth splitting, or jump/game design problems where uniform maximum increments are enforced. The problem is solved cleanly in O(n) time with minimal state.