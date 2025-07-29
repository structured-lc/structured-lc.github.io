### Leetcode 2731 (Medium): Movement of Robots [Practice](https://leetcode.com/problems/movement-of-robots)

### Description  
You are given an integer array `nums` representing the initial positions of robots on an infinite number line and a string `s` representing their movement directions: each character in `s` is 'L' (left) or 'R' (right) for the corresponding robot. All robots start moving simultaneously and move one unit per second in their direction. If two robots collide (i.e., occupy the same position at the same time), they immediately reverse directions and continue moving without delay. Given a positive integer `d`, return the sum of the distances between all pairs of robots after `d` seconds. The return must be the result modulo 10⁹ + 7. Each pair (i, j) is the same as (j, i); don't double count.

### Examples  

**Example 1:**  
Input: `nums = [4, 1, 5]`, `s = "RLR"`, `d = 2`  
Output: `16`  
*Explanation:  
- Robot 0: 4 + 2 = 6  
- Robot 1: 1 - 2 = -1  
- Robot 2: 5 + 2 = 7  
Their positions after 2s: `[6, -1, 7]`.  
The sum of all distances:  
abs(6 - (-1)) + abs(6 - 7) + abs(-1 - 7) = 7 + 1 + 8 = 16*

**Example 2:**  
Input: `nums = [3, 2, 1]`, `s = "LLR"`, `d = 1`  
Output: `4`  
*Explanation:  
- Robot 0: 3 - 1 = 2  
- Robot 1: 2 - 1 = 1  
- Robot 2: 1 + 1 = 2  
Positions: `[2,1,2]`.  
Pairs: abs(2-1)=1, abs(2-2)=0, abs(1-2)=1  
Sum = 1+0+1=2  
Note: three unique pairs --> (0,1), (0,2), (1,2), but only unique distances. Some pairs have the same value.*

**Example 3:**  
Input: `nums = [1,0]`, `s = "RL"`, `d = 2`  
Output: `4`  
*Explanation:  
- Robot 0: 1 + 2 = 3  
- Robot 1: 0 - 2 = -2  
Positions: `[3, -2]`.  
Distance: abs(3-(-2))=5.*

### Thought Process (as if you’re the interviewee)  
First, simulate the movement: for each robot, at time `d`, its position will be `nums[i] + d` if going right, `nums[i] - d` if left.  
The problem mentions collisions where robots reverse direction, but **collisions don’t affect the final set of positions or pairwise distances**—the sum of pairwise distances is the same as if robots passed through each other (since reversing both directions upon collision is equivalent to passing through instead of bouncing, due to symmetry). So, we don’t need to explicitly simulate collisions; just compute final positions as if no collisions happen.

Having all robots' final positions, sort them, then efficiently compute the sum of absolute pairwise differences.

For sum of all pairs' absolute differences:
- If positions are sorted as p₀ ≤ p₁ ≤ ... ≤ pₙ₋₁,
- The total distance is: ∑(positions[i] × i - positions[i] × (n-i-1)) for i from 0 to n-1.

This pattern leverages prefix sums.

### Corner cases to consider  
- All robots at the same position.
- All robots with the same direction.
- Only one robot.
- Large `d` or large numbers (possible integer overflow).
- Robots moving in both directions with overlapping positions.
- Robots that cross or tie after movement.

### Solution

```python
def sumDistance(nums, s, d):
    MOD = 10**9 + 7
    n = len(nums)
    # Compute final positions
    positions = []
    for i in range(n):
        if s[i] == 'R':
            positions.append(nums[i] + d)
        else:
            positions.append(nums[i] - d)
    # Sort for prefix sum math
    positions.sort()
    
    res = 0
    prefix = 0
    # For each robot, sum its distance with all previous (ordered)
    for i in range(n):
        res = (res + positions[i] * i - prefix) % MOD
        prefix = (prefix + positions[i]) % MOD
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting final positions. Computing prefix sums and differences is O(n).
- **Space Complexity:** O(n) extra to store the positions array and prefix calculations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the answer change if collisions resulted in robots stopping?
  *Hint: What if robots occupy the same point and then halt? Simulate or adjust the logic accordingly.*
- What if robots had variable speeds?
  *Hint: Instead of a fixed unit, use speeds[i] × d for each robot’s displacement.*
- Can you compute the sum efficiently for very large arrays (n > 10⁵) if only a windowed subset of the robots is considered for the sum?
  *Hint: Prefix sums let you compute subarray distances in O(1) per query after O(n log n) preprocessing.*

### Summary
This problem uses the common prefix sum + sorting trick to efficiently compute the sum of all pairwise absolute differences after a transformation (robots' movement). The main insight is that collisions (bouncing) don’t affect the set of final positions or answers—so the task reduces to a standard 1D absolute pairwise distances sum. This pattern applies to "distance in a straight line after simultaneous movement" problems as well as some 1D physics and logistics optimizations.