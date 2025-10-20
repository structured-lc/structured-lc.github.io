### Leetcode 2898 (Medium): Maximum Linear Stock Score [Practice](https://leetcode.com/problems/maximum-linear-stock-score)

### Description  
Given an array **prices** where prices[i] is the price of a stock on the (i+1)ˢᵗ day, find the maximum **score** of a linear selection of days.  
A selection of indices is **linear** if for every consecutive pair (i, j):  
prices[j] - prices[i] == j - i  
The **score** is the sum of the selected prices.  
Your task: Select days (possibly out of order and non-consecutive, but following the linearity rule) to maximize the total score.

### Examples  

**Example 1:**  
Input: `prices = [4, 5, 6]`  
Output: `15`  
*Explanation: You can take all indices [1,2,3]. Each difference equals 1: (5-4==2-1, 6-5==3-2). Sum is 4+5+6=15.*

**Example 2:**  
Input: `prices = [5,6,7,8,9]`  
Output: `35`  
*Explanation: All elements form a linear selection. (6-5=1, 7-6=1, 8-7=1, 9-8=1). Sum is 5+6+7+8+9=35.*

**Example 3:**  
Input: `prices = [3, 8, 5, 10, 7]`  
Output: `18`  
*Explanation: Select indices [1,3,5].  
- (5-3) = (3-1) = 2, (7-5) = (5-3) = 2.  
Sum is 3+5+7=15. But picking [2,4] gives (10-8)=(4-2)=2 and sum 8+10=18, which is higher.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible subsets of days and check if they form a linear sequence, then sum the prices. This is exponential (2ⁿ), infeasible for large n.

- **Observation:**  
  The linearity condition can be rewritten:
  prices[j] - j == prices[i] - i for all selected indices i, j.
  That means, for each possible value of (prices[i] - i), all indices with the same value can be taken together to form a linear selection.

- **Optimization:**  
  - For every i, compute key = prices[i] - i.
  - For each possible key, sum all prices[i] sharing the same key.
  - The answer is the maximal sum over all groups.
- **Why does this work?**  
  - Because prices[j]-j == prices[i]-i means the sequence of (prices[i] - i) stays constant, which matches the required property.
  - This allows linear time grouping and summing.

### Corner cases to consider  
- Empty array (problem constraints: at least 1 item, so ignored)
- All prices are the same
- Only one element
- No linear selection except single elements
- Multiple keys with same group sum (pick max)
- Large numbers or long array

### Solution

```python
def maxLinearStockScore(prices):
    # Dictionary to group prices by (price - index)
    group_sums = dict()
    for i, price in enumerate(prices):
        key = price - i
        if key in group_sums:
            group_sums[key] += price
        else:
            group_sums[key] = price
    # The answer is the maximum group sum
    return max(group_sums.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    Each price is processed once to compute the key and update a dictionary.
- **Space Complexity:** O(n) in the worst case (all keys unique).

### Potential follow-up questions (as if you’re the interviewer)  

- If the linear condition was prices[j] - prices[i] == c \* (j - i) for any integer c, how would you adapt the algorithm?  
  *Hint: Try grouping by (prices[i] - c \* i).*

- Can you reconstruct which indices constitute the optimal selection instead of only the score?  
  *Hint: Keep a map of lists for indices while grouping.*

- What if the array can have negative numbers or zeros?  
  *Hint: No change; logic holds for any integer prices.*

### Summary
This problem uses the **grouping by invariant** pattern, exploiting that prices[i] - i is constant for valid linear subsequences.  
This is a classic case for **hash map grouping by key**.  
The pattern appears in problems involving sequences with fixed difference, or where a property is maintained over indices or values — similar to arithmetic subsequence or longest equal-difference subarray problems.


### Flashcard
For each price[i], compute price[i] - i; group indices with same value and sum their prices for the maximum linear score.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
