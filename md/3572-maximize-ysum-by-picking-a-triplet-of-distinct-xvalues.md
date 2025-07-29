### Leetcode 3572 (Medium): Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values [Practice](https://leetcode.com/problems/maximize-ysum-by-picking-a-triplet-of-distinct-xvalues)

### Description  
Given two integer arrays **x** and **y** of equal length n, you are to pick three distinct indices i, j, k (i ≠ j ≠ k) such that **x[i]**, **x[j]**, and **x[k]** are all *distinct*. Your goal is to maximize the sum **y[i] + y[j] + y[k]** for such a triplet.  
Return the **maximum possible sum** for any such triplet; if there is *no* triplet of indices satisfying the constraints, return -1.

### Examples  

**Example 1:**  
Input: `x = [1,2,3,1,2,3]`, `y = [5,3,6,4,2,7]`  
Output: `18`  
*Explanation: Pick indices 2 (x=3, y=6), 5 (x=3, y=7), and 0 (x=1, y=5)*  
But only three distinct x-values allowed, so we must pick one from each unique x.  
Pick: idx 0 (x=1, y=5), idx 1 (x=2, y=3), idx 2 (x=3, y=6) ⇒ sum=5+3+6=14,  
But if choose idx 3 (x=1, y=4), idx 1 (x=2, y=3), idx 5 (x=3, y=7) ⇒ 4+3+7=14,  
The best is idx 0 (x=1, y=5), idx 4 (x=2, y=2), idx 5 (x=3, y=7): 5+2+7=14.  
Which is 14 in this setup. (If values were higher for the unique x, their y's sum.)  

**Example 2:**  
Input: `x = [1,2,2,3]`, `y = [4,4,9,2]`  
Output: `17`  
*Explanation: Take one element for each unique x: idx 0 (x=1, y=4), idx 2 (x=2, y=9), idx 3 (x=3, y=2).  
Sum = 4+9+2 = 15*  

**Example 3:**  
Input: `x = [1,1,1]`, `y = [7,8,9]`  
Output: `-1`  
*Explanation: Only one distinct x value. Can't pick triplet with three different x's.*


### Thought Process (as if you’re the interviewee)  
- First, since we need three *distinct* x-values, our answer must use three unique x's; we’ll need at least three unique x-values in the input.
- For each x, can only pick at most one index (otherwise two y's would correspond to the same x).
- Thus, for each unique x-value, we want the largest corresponding y-value (maximize contribution for each x).
- So, collect for each unique x the *maximum* y for that x.
- Now, if we have fewer than 3 unique x's, answer is -1.
- Otherwise, pick the *three largest y’s from unique x’s* and sum as our answer.
- Brute-force (O(n³)) would be to check all i,j,k, which is inefficient.
- Instead, build a map from x-value to its max-y, then sum top 3, which is much more efficient and simple to implement.

### Corner cases to consider  
- Fewer than 3 unique x-values: return -1.
- Multiple indices with same x, but only pick max y for each.
- n < 3: impossible, return -1.
- Negative y-values: should still maximize the sum.
- All y values negative: still take the three least negative (largest) values.

### Solution

```python
def maximizeYSum(x, y):
    # Map each x value to its maximum y
    x_to_max_y = dict()
    for i in range(len(x)):
        if x[i] in x_to_max_y:
            x_to_max_y[x[i]] = max(x_to_max_y[x[i]], y[i])
        else:
            x_to_max_y[x[i]] = y[i]
    
    # Need at least 3 unique x values
    if len(x_to_max_y) < 3:
        return -1

    # Get all max-y values, sort them descending
    max_ys = sorted(x_to_max_y.values(), reverse=True)

    # Return the sum of the top 3 max-y's
    return max_ys[0] + max_ys[1] + max_ys[2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Building the map is O(n), sorting at most 10⁵ elements (size of unique x's), so usually O(n log n), but if max unique x is small, it's closer to O(n).  
  In practice, it’s O(n log k) where k = count of unique x's.
- **Space Complexity:** O(k).  
  Storing up to k = number of unique x-values in the hash map and array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the indices of the elements too?  
  *Hint: Remember the original indices when updating your map.*

- How would you handle larger constraints, e.g., streaming input?  
  *Hint: Only track top 3 max-y’s at any time; avoid full sorts.*

- What if you needed the k largest sum for any valid k (not just 3)?  
  *Hint: Generalize to the top-k max-y’s for unique x’s; possibly use a min-heap.*

### Summary
The approach uses the "hashmap + sort top-k values" pattern, which trades O(n³) brute force for efficient O(n log n) or better and is common in problems where we want the best selection of unique-classed items. This is widely applicable for maximizing/minimizing subset values under grouping or uniqueness constraints, including many contest-style selection problems.