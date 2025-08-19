### Leetcode 1739 (Hard): Building Boxes [Practice](https://leetcode.com/problems/building-boxes)

### Description  
You are given a cubic storeroom of unlimited dimensions and have **n** unit cubic boxes. Boxes must be arranged according to the following rules:
- You can place any number of boxes directly on the floor.
- If you stack a box on top of another, every vertical side of the *lower* box must either be adjacent to the wall or to another box.
- **Task:** Find the *minimum possible* number of boxes that must be placed on the floor to build a structure with all n boxes under these rules.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `3`  
*Explanation: All 3 boxes are placed next to each other in a corner on the floor.*

**Example 2:**  
Input: `n = 4`  
Output: `3`  
*Explanation: 3 boxes form the base in a corner, the 4ᵗʰ box sits on top of one of them:*

```
Level 2:   #
Level 1: # # #
```
List: [#, #, #, #]

**Example 3:**  
Input: `n = 10`  
Output: `6`  
*Explanation: 6 boxes form a triangular base, the upper 4 boxes fit above, forming a pyramid in a corner:*

```
Level 3:     #
Level 2:   # #
Level 1: # # # #
```
List: [#, #, #, #, #, #, #, #, #, #]

### Thought Process (as if you’re the interviewee)  
At first glance, this feels like a stacking or piling problem, but the adjacency rule for lower boxes makes classic column stacking impossible unless the bottom layer is very wide.  
- **Brute force:**  
  Try all possible floor box counts and stack up? Impractical for large n.

- **Insights:**  
  - Stacking in a corner lets you use walls to "complete" the requirement for edge adjacency.  
  - Any stack should build layer by layer, where each layer forms a triangle in the corner.  
  - Each layer k contains k boxes (1 box on top, then 2 in the second layer, then 3 in the third, etc).  
  - The total number of boxes in t full layers is the *tetrahedral number*: T = t × (t+1) × (t+2) / 6.  
  - For a given n, we want to maximize t such that T ≤ n.
  - After building those full layers, you place leftovers greedily in a new highest layer, possibly increasing the base count.

- **Optimized approach:**  
  - Find the largest t such that T (tetrahedral number) ≤ n.
  - For the remaining boxes, minimize the number of new base boxes required by using a triangular base layer (since additional boxes must also sit on the floor).

- **Why this approach:**  
  Calculates directly in O(1) time for the tetrahedral number, then a manageable O(√n) or better for the rest, which is needed for n up to 10⁹.

### Corner cases to consider  
- n = 1 (just one box, must be on floor)
- n is a tetrahedral number (all layers complete, no leftovers)
- Adding just 1 or 2 boxes over a complete structure (forces you to add a higher/extra base)
- Large n (test for integer overflow, precision)

### Solution

```python
def minimum_boxes(n: int) -> int:
    # First, find the largest t such that tetrahedral number T = t*(t+1)*(t+2)//6 <= n
    t = 0
    total = 0
    while True:
        next_total = (t + 1) * (t + 2) * (t + 3) // 6
        if next_total > n:
            break
        t += 1
        total = next_total

    rem = n - total

    if rem == 0:
        # Perfect tetrahedral number: answer is total number in the bottom base, which is t*(t+1)//2
        return t * (t + 1) // 2

    # Count how many more boxes must be added to the bottom to accommodate rem extra boxes
    # Each extra box can add +1 to the bottom layer until done
    # Use a triangle number formula: minimal k where k*(k+1)//2 >= rem
    k = 0
    while k * (k + 1) // 2 < rem:
        k += 1

    return t * (t + 1) // 2 + k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n) — Finding the maximal t (layers) and minimal k (remaining boxes) is limited by the fact that triangle and tetrahedron numbers rise quickly.
- **Space Complexity:** O(1) — Only uses fixed variables, no recursion or extra storage scaling with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently compute the tetrahedral and triangle numbers for very large n?
  *Hint: Consider direct formulae, beware integer overflows.*

- Is there a way to further optimize finding t and k without iteration?
  *Hint: Use properties of cubic/quadratic equations.*

- How does the answer change if you weren’t restricted to stacking only in the corner?
  *Hint: Explore the impact of wall-adjacency on legal floor configurations.*

### Summary
This is a classic **mathematical layer-building and greedy allocation** problem, relying on tetrahedral numbers for stacked pyramid counts and triangle numbers for additional needed boxes. The structure uses direct formulae and avoids brute force by leveraging the properties of 3D triangular stacking. This pattern is useful in problems involving combinatorial geometry, optimal resource allocation in constrained spaces, and minimizing a base under adjacency rules.

### Tags
Math(#math), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Block Placement Queries(block-placement-queries) (Hard)