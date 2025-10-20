### Leetcode 2907 (Medium): Maximum Profitable Triplets With Increasing Prices I [Practice](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i)

### Description  
Given two integer arrays **prices** and **profits** (each of length n), find three indices i, j, k (with 0 ≤ i < j < k < n) such that prices[i] < prices[j] < prices[k], and return the **maximum possible sum profits[i] + profits[j] + profits[k]**.
Return -1 if no such triplet exists.

We need to maximize the total profit from choosing three items where prices strictly increase and indices strictly increase. If no such selection is possible, return -1 instead.

### Examples  

**Example 1:**  
Input: `prices = [1, 3, 2, 4], profits = [1, 2, 3, 4]`  
Output: `9`  
Explanation:  
Pick i=0, j=1, k=3. prices=1 < prices[1]=3 < prices[3]=4, profits sum = 1+2+4 = 7.  
But better: i=0, j=2, k=3, prices=1 < prices[2]=2 < prices[3]=4, sum = 1+3+4 = 8.  
Best: i=0, j=1, k=3 (profits: 1+2+4=7)  
But actually the best is i=0, j=2, k=3 (profits: 1+3+4=8).  
But using [5], let's just say: the max possible sum is `1+3+4=8`.

**Example 2:**  
Input: `prices = [1, 2, 3, 4, 5], profits = [1, 5, 3, 4, 6]`  
Output: `15`  
Explanation:  
Any i < j < k works, so take the three largest profits: 5 (index 1), 4 (index 3), 6 (index 4).  
Sum: 5+4+6=15.

**Example 3:**  
Input: `prices = [4, 3, 2, 1], profits = [33, 20, 19, 87]`  
Output: `-1`  
Explanation:  
Prices always decrease, so it's impossible to find indices i, j, k with prices[i] < prices[j] < prices[k].  

### Thought Process (as if you’re the interviewee)  
First, let’s try brute-force:  
- Iterate all possible triplets i, j, k (0 ≤ i < j < k < n), and for each, check if prices[i] < prices[j] < prices[k].
- If so, sum profits[i]+profits[j]+profits[k], and keep track of the maximum.

This is O(n³) and will time out quickly for n up to 2000.

Let’s optimize:
- For each possible j (middle index), try to select the best i (to the left) with prices[i] < prices[j] for max profits[i], and best k (to the right) with prices[k] > prices[j] for max profits[k].
- For each j, search all i in [0, j) with prices[i] < prices[j], keep the max profits[i] as left.
- For each k in (j, n) with prices[k] > prices[j], take max profits[k] as right.
- For each j, if both left and right are found, answer = max(answer, left + profits[j] + right).

This is O(n²): for each j, scan left and right.

In Python, avoiding shortcuts as in an interview, we use nested loops, keeping code clear and adding checks/comments.

### Corner cases to consider  
- prices or profits length < 3 (by constraint won’t happen, but should defensively consider)
- All prices the same
- All profits are negative/zero (doesn’t happen by constraints, but returns lowest sum)
- All prices are strictly decreasing
- Only one possible valid triplet

### Solution

```python
def maximumProfitableTriplet(prices, profits):
    n = len(prices)
    max_profit = -1

    for j in range(1, n-1):  # j is the middle index
        # Find best (max profit) i to the left of j where prices[i] < prices[j]
        left = 0
        for i in range(j):
            if prices[i] < prices[j]:
                if profits[i] > left:
                    left = profits[i]
        # Find best (max profit) k to the right of j where prices[k] > prices[j]
        right = 0
        for k in range(j+1, n):
            if prices[k] > prices[j]:
                if profits[k] > right:
                    right = profits[k]
        # If both a valid i and k exist, update max_profit
        if left and right:
            total = left + profits[j] + right
            if total > max_profit:
                max_profit = total

    return max_profit if max_profit != -1 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) – There are O(n) possible j's, and for each, O(n) work to scan the left and right sides.

- **Space Complexity:**  
  O(1) – No extra storage beyond variables. (If we wanted to optimize with extra arrays — for the largest left and right max by price — could use a bit more.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it in O(n log n) or possibly O(n)?
  *Hint: Precompute left/right best profits using trees or monotonic data structures.*

- If duplicates of prices were allowed, would your answer need to change?
  *Hint: Would you pick profits from repeated prices, or require strictly increasing prices?*

- What if you needed to output the indices, not just the profit?
  *Hint: Track the index along with the value whenever you update max profits.*

### Summary
This solution uses a common **enumerate the middle element** pattern:  
For each possible "pivot" index, search left and right for the best candidates that satisfy the strictly increasing price property.  
It's O(n²), works within reasonable input sizes (n≤2000), and uses no extra storage.
The pattern appears in other triplet problems that require a strict ordering and maximize/minimize over variable partitions.


### Flashcard
For each middle index j, find best i < j with prices[i] < prices[j] for max profits[i], and best k > j with prices[k] > prices[j] for max profits[k]; combine for max triplet sum.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
