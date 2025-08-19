### Leetcode 1503 (Medium): Last Moment Before All Ants Fall Out of a Plank [Practice](https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank)

### Description  
You are given a *plank* of length n with some ants moving to the left (starting at given positions) and some moving to the right (other positions). All ants walk at the same speed — when two ants collide, they simply swap direction (indistinguishable for this problem: we can treat as passing through each other). The question: **what is the last moment when any ant falls off the plank?**

### Examples  
**Example 1:**  
Input: `n=4, left=[4,3], right=[0,1]`  
Output: `4`
*Explanation: Ant at 4 falls at time 0; at 3 needs 3 units to reach left end; at 0 and 1 head to right, take 4 and 3 units to reach right end; last one off is at t=4.*

**Example 2:**  
Input: `n=7, left=[0,1,2,4,6,7], right=[]`  
Output: `7`  
*Explanation: All ants move left, so start at farthest position from left (7), takes 7 units to fall off.*

**Example 3:**  
Input: `n=7, left=[], right=[0,1,2,4,6,7]`  
Output: `7`  
*Explanation: All ants move right: max distance to right edge from all starting points: n - pos (so max is at 0: takes 7 units).* 

### Thought Process (as if you’re the interviewee)  
The collisions do not actually matter to timing: swapping directions is indistinguishable from passing through (all ants are identical). Therefore:
- For each ant heading left, last time it falls is just its position (since it exits at pos=0).
- For ant heading right, last time to fall is (n - pos).
- The answer is max of all these times.

### Corner cases to consider  
- No ants moving in one direction (left or right array empty).
- Multiple ants at same starting point.
- Length n is 0.
- Arrays empty (no ants).

### Solution

```python
def getLastMoment(n, left, right):
    max_left = max(left) if left else 0
    max_right = max([n - pos for pos in right]) if right else 0
    return max(max_left, max_right)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(l + r), l = left count, r = right count.
- **Space Complexity:** O(1) extra.

### Potential follow-up questions (as if you’re the interviewer)  
- What if ants have different speeds?  
  *Hint: Now collisions matter: must simulate, or track which ant exits when.*
- How would your answer change if ants fell off at arbitrary (non-end) positions?  
  *Hint: Treat as per updated geometry.*
- How about if collisions destroy both ants (annihilation)?  
  *Hint: Need to simulate interactions, track exits carefully.*

### Summary
Classic **simulation reduction**: after realizing collision is irrelevant to final result (label swap), can solve simply by considering max time for each direction. This pattern appears in problems where symmetry/indistinguishability allows ignoring intermediate interactions.

### Tags
Array(#array), Brainteaser(#brainteaser), Simulation(#simulation)

### Similar Problems
- Count Collisions on a Road(count-collisions-on-a-road) (Medium)
- Movement of Robots(movement-of-robots) (Medium)