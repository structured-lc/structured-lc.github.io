### Leetcode 561 (Easy): Array Partition [Practice](https://leetcode.com/problems/array-partition)

### Description  
Given an array of 2n integers, group these numbers into n pairs such that the sum of the minimum value in each pair is maximized. In other words: Pair up all elements into n pairs (`(a₁, b₁), (a₂, b₂), …, (aₙ, bₙ)`) and return the largest possible value of `min(a₁, b₁) + min(a₂, b₂) + ... + min(aₙ, bₙ)`.

### Examples  

**Example 1:**  
Input: `nums = [1,4,3,2]`  
Output: `4`  
*Explanation: Sort the array → [1,2,3,4]. Pair as (1,2) and (3,4). Sum of mins is 1 + 3 = 4.*

**Example 2:**  
Input: `nums = [6,2,6,5,1,2]`  
Output: `9`  
*Explanation: Sort → [1,2,2,5,6,6]. Pair as (1,2), (2,5), (6,6). Sum of mins is 1 + 2 + 6 = 9.*

**Example 3:**  
Input: `nums = [3,1,5,4,2,6]`  
Output: `9`  
*Explanation: Sort → [1,2,3,4,5,6]. Pair as (1,2), (3,4), (5,6). Sum is 1 + 3 + 5 = 9.*

### Thought Process (as if you’re the interviewee)  
Initially, I would consider generating all possible pairings and calculating the required sum for each, but with n pairs, the number of combinations would be very large—making this brute force approach impractical.

Instead, let's analyze: for each pair, to maximize the sum of their minimums, we should try to avoid "wasting" small numbers by pairing them together when not needed. Sorting the array solves this: if we sort the array and always pick adjacent pairs, the minimum in each pair will always be the first of the two—so we simply sum up all the elements at even indices (0-based). This guarantees a maximal total, as smaller numbers are never "buried" in suboptimal pairs.

Optimized approach:
- Sort the array.
- Loop through every other index and sum those numbers.

This approach relies on a key greedy insight: pairing the closest numbers ensures the biggest numbers can't "block" (reduce the minimum of) a pair, and all small numbers get used optimally.

### Corner cases to consider  
- Input array is empty (`[]`) — not possible as per problem description (always 2n elements).
- All elements are equal (e.g. `[2,2,2,2]`).
- Array contains both positive and negative numbers.
- Array is already sorted or reverse-sorted.
- Maximum/minimum valid integer values.

### Solution

```python
def arrayPairSum(nums):
    # Step 1: Sort the array in ascending order
    nums.sort()
    result = 0
    # Step 2: Add every second element starting from index 0
    for i in range(0, len(nums), 2):
        result += nums[i]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting the array is the main cost, where n is the length of the array.
- **Space Complexity:** O(1) extra space (assuming in-place sorting, not counting input), O(n) if sort creates a new array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you couldn’t use sorting?  
  *Hint: Can you use counting sort if the input range is small or fixed?*

- How would the approach change if the array could be of odd length?  
  *Hint: Would it be valid? What does pairing mean if there is an extra element?*

- What if you were only allowed to traverse the array once?  
  *Hint: Is there a way to pair up numbers optimally without sorting? Under what constraints?*

### Summary

This problem uses a classic **greedy sorting** pattern: sorting followed by optimal group selection (every other element). This kind of technique appears in maximization problems involving pairs or triplets. Patterns like this apply in other array partitioning or pairing minimization/maximization tasks, especially where ordering enables a simple direct computation.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
- Minimum Difference Between Highest and Lowest of K Scores(minimum-difference-between-highest-and-lowest-of-k-scores) (Easy)
- Minimum Cost of Buying Candies With Discount(minimum-cost-of-buying-candies-with-discount) (Easy)
- All Divisions With the Highest Score of a Binary Array(all-divisions-with-the-highest-score-of-a-binary-array) (Medium)