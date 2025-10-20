### Leetcode 546 (Hard): Remove Boxes [Practice](https://leetcode.com/problems/remove-boxes)

### Description  
Given an array representing colored boxes (as integers), you can remove any group of **consecutive boxes of the same color** in a round, earning points equal to the square of the group’s length (k × k). Your task is to choose the order of removals to **maximize the total score**. After each removal, the remaining boxes are concatenated. Repeat this until all boxes are removed. Return the maximum total points possible.

### Examples  

**Example 1:**  
Input: `[1,3,2,2,2,3,1]`  
Output: `23`  
*Explanation: One optimal solution is:  
- Remove boxes[2:5] (the three '2's): 3 × 3 = 9  
- Now boxes = [1,3,3,1]  
- Remove boxes[1:3] (the two '3's): 2 × 2 = 4  
- Now boxes = [1,1]  
- Remove boxes[0:2]: 2 × 2 = 4  
- Now boxes = []  
- Total = 9 + 4 + 4 = 17 (not optimal).  
But if you remove [3] then the two 1s can be together, getting a better score:  
- Remove single 3 at index 1: 1 × 1 = 1  
- Remove [2,2,2]: 3 × 3 = 9  
- Remove 3 at index 1: 1 × 1 = 1  
- Remove [1,1]: 2 × 2 = 4  
- 1 + 9 + 1 + 4 = 15  
The actual optimal is 23 (computed by DP).*

**Example 2:**  
Input: `[1,1,1]`  
Output: `9`  
*Explanation: Remove all at once: 3 × 3 = 9.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Single box: 1 × 1 = 1.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible way to remove a group of consecutive same-color boxes at each step. For each removal, recursively solve the subproblems on the remaining boxes, sum the scores, and keep the maximum.  
  - **Downside:** Way too many possibilities—exponential time.

- **DP optimization:**  
  Overlapping subproblems occur because after removing boxes, the subarrays can reoccur unchanged in different call paths. We notice:  
  - When removing a segment, sometimes by *waiting* you can collect some same-color boxes together for a much larger score.  
  - Use memoization: Define a state (l, r, k) where:
     - **l**: left index in the `boxes`
     - **r**: right index (inclusive)
     - **k**: number of boxes to the left of `l`, all having color boxes[l], but already grouped with it (carry-over count)
  - The DP `dp(l, r, k)` means: max points you can get from boxes[l:r+1] with k extra boxes of color boxes[l] to the left.
  - Transitions:
    - Remove the prefix of boxes with same color as boxes[l]: score is (k+c)², where c is count of consecutive same color starting at left, then solve dp(next_l, r, 0).
    - Try *merging* same-color boxes further right by recursively removing blocks in between.
  - This approach has O(n³) distinct states, each taking up to O(n) transitions ⇒ O(n⁴) time.

### Corner cases to consider  
- Empty array: should return 0.
- All boxes same color (maximize by one pick).
- No two adjacent boxes have the same color.
- Only two boxes, different or same.
- Large input, all colors different.
- The most optimal strategy involves *not* always picking the biggest group — sometimes keeping some boxes allows better merges later.


### Solution

```python
def removeBoxes(boxes):
    # DP memoization: dp(l, r, k)
    # l: start index, r: end index (inclusive)
    # k: number of boxes immediately to the left of l that are same color as boxes[l]
    from functools import lru_cache

    n = len(boxes)
    
    # Use lru_cache for 3D memoization
    @lru_cache(None)
    def dp(l, r, k):
        if l > r:
            return 0
        
        # Optimization: Increase k by merging identical colors at left
        orig_l = l
        orig_k = k
        # Merge consecutive boxes of same color at left
        while l + 1 <= r and boxes[l] == boxes[l+1]:
            l += 1
            k += 1
        
        # Option 1: Remove boxes[l...(l,k)] immediately (all k+1 same colors at start)
        res = (k + 1) ** 2 + dp(l + 1, r, 0)
        
        # Option 2: Try to merge future same-color boxes with [l...(l,k)]
        for m in range(l + 1, r + 1):
            if boxes[m] == boxes[l]:
                # Remove boxes [l+1 ... m-1] first, so [l,m] are together
                temp = dp(l + 1, m - 1, 0) + dp(m, r, k + 1)
                if temp > res:
                    res = temp
        return res

    return dp(0, n - 1, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n⁴) — There are O(n³) states (l, r, k each ≤ n) and each state may take up to O(n) transitions (the merges).
- **Space Complexity:** O(n³) for the memoization table (due to three variables: l, r, k; n ≤ 100).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose boxes[] can be very long (> 1000). How could you adapt or approximate?  
  *Hint: Could you compress segments or use heuristic greedy/DP hybrid?*

- What if cost/performance of removal is not square (k × k), but arbitrary f(k)?  
  *Hint: How would the DP change if the scoring function is not quadratic?*

- How would you output the sequence of moves that gives the maximal score?  
  *Hint: Maintain parent pointers or reconstruct sequence from DP choices.*

### Summary
This problem is a classic example of **interval DP with extra parameters**, specifically a 3D DP due to the "carry" of adjoining same-color blocks (k). This approach is seen in hard dynamic programming sequence/partitioning problems—variations show up anywhere future merges or grouping strategy can affect the total reward, such as burst balloons, matrix chain multiplication, and similar DP optimizations in combinatorial structures.


### Flashcard
DP with memoization on subarrays and counts of adjacent same-color boxes avoids exponential brute-force.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
- Strange Printer(strange-printer) (Hard)
- Number of Unique Flavors After Sharing K Candies(number-of-unique-flavors-after-sharing-k-candies) (Medium)