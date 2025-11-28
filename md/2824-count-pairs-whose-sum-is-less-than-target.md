### Leetcode 2824 (Easy): Count Pairs Whose Sum is Less than Target [Practice](https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target)

### Description  
Given an integer array `nums` and an integer `target`, count the number of unique pairs of indices (i, j) such that 0 ≤ i < j < n (where n = len(nums)) and nums[i] + nums[j] < target.  
You can assume the array is zero-indexed.  
Return just the count of such pairs.

### Examples  

**Example 1:**  
Input: `nums = [7,2,5,3], target = 8`  
Output: `2`  
*Explanation: The sum of (2,5) = 7 and (2,3) = 5 are both less than 8. Only these pairs qualify: (1,2) and (1,3) (since i < j).*

**Example 2:**  
Input: `nums = [5,2,3,2,4,1], target = 5`  
Output: `4`  
*Explanation: The valid pairs are (2,2), (2,1), (3,1), (2,1) from indices (1,3), (1,5), (2,5), (3,5) respectively. Each sum is less than 5.*

**Example 3:**  
Input: `nums = [2,1,8,3,4,7,6,5], target = 7`  
Output: `6`  
*Explanation: The qualifying pairs are (2,1), (2,3), (2,4), (1,3), (1,4), (1,7) from indices (0,1), (0,3), (0,4), (1,3), (1,4), (1,7), all with sum < 7.*

### Thought Process (as if you’re the interviewee)  
The simplest way to solve this problem is to check every possible pair (i, j) where 0 ≤ i < j < n, and count those where nums[i] + nums[j] < target. This is the brute-force approach using two nested loops.

For optimization, if the input array was sorted, we could potentially use a two-pointer technique to reduce time complexity. However, since we only need the count (not the actual pairs or their indices), and there are no special constraints (like avoiding duplicates by value), and the problem allows both negative and positive values, brute force is acceptable for small constraints.  

If the array is large, you could first sort and then use two pointers:
- Sort `nums`
- Initialize `left = 0`, `right = n - 1`.
- While `left < right`:
    - If nums[left] + nums[right] < target, then all (left, left+1, ..., right-1) paired with right would be valid, count those, move `left`.
    - Else, decrement `right`.

But unless the constraints require further optimization, the brute-force method is acceptable in O(n²) time.

### Corner cases to consider  
- Empty array (`nums = []`) → output should be 0.  
- Single element array (`nums = [4]`) → output should be 0.  
- All elements equal and target large enough to allow all sums.  
- All elements such that no two can sum less than target.  
- Negative numbers in array.  
- Target is negative.

### Solution

```python
def count_pairs(nums, target):
    # Brute-force approach: check all pairs where 0 ≤ i < j < len(nums)
    count = 0
    n = len(nums)
    for i in range(n):
        for j in range(i+1, n):
            # Check if the sum of the current pair is less than target
            if nums[i] + nums[j] < target:
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  There are n elements. For each i, we check j from i+1 to n-1, yielding about n × n/2 = n²/2 pairs (⌊n/2⌋ for each i). No sorting or other major operations.
- **Space Complexity:** O(1)  
  Only a few variables (`count`, `i`, `j`) are used; input is not modified and no extra data structures are required.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the algorithm for very large arrays?  
  *Hint: Try sorting and then using two pointers to count valid pairs efficiently.*

- How would your approach change if you must return the actual pairs, not just the count?  
  *Hint: Consider storing or yielding pairs while iterating through combinations.*

- What if duplicates (by value) should not count as distinct pairs?  
  *Hint: You may need to use a set to keep pairs unique by value, not just indices.*

### Summary
This problem follows the classic brute-force pair counting pattern: test all unique i < j index pairs and check a condition (here, sum < target).  
The same pattern applies in "two-sum variants," triplet counting, and generally when dealing with combinations of k elements with certain properties.  
For optimization, using sorting and two pointers can reduce pairwise comparisons if only counts are required, especially for sorted arrays.


### Flashcard
Brute-force two nested loops checking all pairs (i, j) where i < j; count pairs where nums[i] + nums[j] < target—O(n²) is acceptable for small n.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Count the Number of Fair Pairs(count-the-number-of-fair-pairs) (Medium)