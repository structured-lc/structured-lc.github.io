### Leetcode 2551 (Hard): Put Marbles in Bags [Practice](https://leetcode.com/problems/put-marbles-in-bags)

### Description  
Given an array `weights` where `weights[i]` is the weight of the iᵗʰ marble, and an integer `k`, you must split the marbles into k **contiguous** subarrays (bags).  
- Each bag must contain at least one marble; none can be empty.  
- The **cost** of a bag is the sum of the first and last marble in that bag: cost = weights[left] + weights[right].
- The **score** is the sum of the costs for all k bags.
Return the difference between the **maximum possible score** and the **minimum possible score** over all valid divisions of the array into k bags.

### Examples  

**Example 1:**  
Input: `weights = [1,3,5,1], k = 2`  
Output: `4`  
*Explanation:*
We want to split the array into 2 contiguous subarrays.
- Possible splits:
  - [1] [3,5,1]: costs = 1+1, 3+1 → 2 + 4 = 6
  - [1,3] [5,1]: costs = 1+3, 5+1 → 4 + 6 = 10
  - [1,3,5] [1]: costs = 1+5, 1+1 → 6 + 2 = 8
  The max is 10, the min is 6, so the answer is 10-6=4.

**Example 2:**  
Input: `weights = [1, 4, 2, 5, 7], k = 3`  
Output: `9`  
*Explanation:*
Try all ways to split into 3 contiguous subarrays:
- Splits:  
  - [1] [4] [2,5,7]: costs = (1+1)+(4+4)+(2+7)=2+8+9=19  
  - [1] [4,2] [5,7]: costs = (1+1) + (4+2) + (5+7) = 2+6+12=20  
  - [1,4] [2] [5,7]: ... etc  
  The maximum total is 22, the minimum is 13, so difference = 9.

**Example 3:**  
Input: `weights = [2, 2, 2, 2, 2], k = 3`  
Output: `0`  
*Explanation:*
No matter how you split, costs are always sums of 2’s, so both max and min are the same.

### Thought Process (as if you’re the interviewee)  

- **Brute-force**:  
  Try all ways to split the array into k contiguous parts (using k-1 cuts). For each split, calculate the total score as described. Since number of ways to split is combinatorial (choose k-1 cuts among n-1 possible positions), not feasible for large n.

- **Optimization Insight**:  
  For every split point, each bag’s cost is always: weights[left] + weights[right]. The total score for the whole array, without any cuts (one bag), is weights + weights[-1]. When we make cuts, we are essentially *adding* the endpoints introduced by the cuts, and the sum reduces by the number of endpoints we move.

  Each cut at position i (after iᵗʰ marble) splits the array, and introduces both weights[i] (end of left bag) and weights[i+1] (start of right bag) as endpoints/edges. So, for k bags: sum of the k−1 largest pairs of weights[i] + weights[i+1] maximizes the score, and k−1 smallest pairs minimizes.

- **Efficient Approach**:
  - Compute all adjacent sums: pairs[i] = weights[i] + weights[i+1] for i = 0 to n-2.
  - Sort `pairs`.
  - The result = sum of (k−1) largest pairs − sum of (k−1) smallest pairs.

  This avoids checking all splits and boils the solution down to sorting.

### Corner cases to consider  
- weights length = k (each bag has only one marble; must return 0).
- All weights equal.
- k = 1 (full array, so diff = 0).
- Large weights, large n (test performance).
- weights has only 2 elements.

### Solution

```python
def putMarbles(weights, k):
    n = len(weights)
    if k == 1 or k == n:
        return 0

    # Compute all adjacent pairs
    pairs = [weights[i] + weights[i+1] for i in range(n - 1)]

    # Sort the pair sums
    pairs.sort()

    # For max: sum of k-1 largest pairs
    max_score = sum(pairs[-(k-1):])
    # For min: sum of k-1 smallest pairs
    min_score = sum(pairs[:k-1])

    # Return difference
    return max_score - min_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), dominated by the sort of (n-1) pairs. All other operations are O(n).
- **Space Complexity:** O(n), needed to store the adjacent pairs array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the bag cost is sum of all elements in the bag, not just endpoints?  
  *Hint: Might need prefix sums for efficient range queries.*

- How can you return the actual splits (indices) that realize the max/min score?  
  *Hint: Track index while sorting adjacent sums.*

- How would you solve this if the subarrays are not required to be contiguous?  
  *Hint: Would become a different combinatorial problem; may involve DP.*

### Summary
This problem is a great example of reducing an exponential split-search problem to an O(n log n) greedy + sorting solution, hinging on understanding how adjacent splits impact cost.  
The coding technique—preprocessing with an array of pairwise features, followed by sorting and window sum—is a common and powerful pattern for max/min difference problems where cuts or partitions must be chosen strategically.