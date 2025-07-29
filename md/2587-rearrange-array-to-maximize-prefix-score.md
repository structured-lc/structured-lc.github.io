### Leetcode 2587 (Medium): Rearrange Array to Maximize Prefix Score [Practice](https://leetcode.com/problems/rearrange-array-to-maximize-prefix-score)

### Description  
Given an integer array **nums**, you can rearrange its elements in any order. After rearranging, you will compute the *prefix sums* array, where the prefix sum at index *i* is the sum of elements from `nums` to `nums[i]`. The "score" is defined as the number of *positive* integers among the prefix sums. Find the arrangement of **nums** that yields the highest possible score, and return that score.

### Examples  

**Example 1:**  
Input: `[2, -1, 0, 1, -3, 3]`  
Output: `5`  
*Explanation: Arrange as `[3, 2, 1, 0, -1, -3]`. 
Prefix sums: `[3, 5, 6, 6, 5, 2]`.  
All except the last prefix are positive, i.e., 5 positive elements.*

**Example 2:**  
Input: `[1, -2, 3]`  
Output: `3`  
*Explanation: Arrange as `[3, 1, -2]`.  
Prefix sums: `[3, 4, 2]`.  
All 3 prefixes positive.*

**Example 3:**  
Input: `[-1, -2, -3]`  
Output: `0`  
*Explanation: Any arrangement gives only negative prefix sums, so score is 0.*

### Thought Process (as if you’re the interviewee)  
First, let's get clear on the problem:  
We can permute the input. We want as many prefix sums as possible to be positive, so numbers that reduce the running total (negatives) should be added *after* we amass as much positive sum as possible.

**Brute-force:** Try all permutations (n! time) and count positive prefixes for each. Clearly infeasible for large n.

**Greedy approach:**  
If we sort the array *in descending order* (start with the largest numbers), each prefix sum gets the maximum boost before adding in smaller or negative numbers.  
- This ensures a running sum that "stays positive" as long as possible.
- Once the running sum drops to zero or negative, adding further (likely negative) numbers will never bring it back positive—so that’s the best cutoff.

**Why does this work?**  
If we were to insert a large negative earlier, it "kills" the running sum sooner compared to doing it later. By postponing negatives, we maximize the number of positions where the running total is still positive.

### Corner cases to consider  
- All elements are negative.
- All elements are zero.
- Only one element, positive or negative.
- Array contains both large negatives and small positives.
- Array contains zeros (do not break positive or negative streak, but don't help).
- Duplicates of values.
- Large and small arrays.

### Solution

```python
def maxScore(nums):
    # Sort nums in descending order so we accumulate positives first
    nums.sort(reverse=True)
    
    prefix_sum = 0    # running sum of the prefix
    score = 0         # count of positive prefix sums

    for num in nums:
        prefix_sum += num
        if prefix_sum > 0:
            score += 1
        else:
            # As soon as prefix_sum is not positive, further sums can only get smaller
            break
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the array.
- **Space Complexity:** O(1) extra space (if we sort in-place), plus a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted the lexicographically smallest permutation with the maximal score?  
  *Hint: After ordering by value for maximal score, break ties by the original order.*

- Can you do this if the array is streaming (elements arrive one by one)?  
  *Hint: Track running total and maintain a window of descending elements.*

- What changes if you want to maximize sum of positive prefixes, not just their count?  
  *Hint: Try maximizing accumulated sums within positive prefix window.*

### Summary
This problem is a classic example of the *greedy* pattern: maximize some property step by step (here, prefix sum staying positive as long as possible). By sorting descending and accumulating, we achieve the most positive prefix sums. This “delay the negatives” idea comes up frequently in dynamic programming and greedy competitive programming problems.