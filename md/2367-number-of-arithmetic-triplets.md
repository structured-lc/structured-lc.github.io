### Leetcode 2367 (Easy): Number of Arithmetic Triplets [Practice](https://leetcode.com/problems/number-of-arithmetic-triplets)

### Description  
Given a **strictly increasing** integer array `nums` and an integer `diff`, find the number of **unique increasing triplets (i, j, k)** such that:
- 0 ≤ i < j < k < n (with n = len(nums))
- nums[j] - nums[i] == diff
- nums[k] - nums[j] == diff

That is, you’re counting how many groups of three indices appear in order, with exactly `diff` between each consecutive number.

### Examples  

**Example 1:**  
Input: `nums = [0, 1, 4, 6, 7, 10]`, `diff = 3`  
Output: `2`  
*Explanation: The arithmetic triplets are (1, 4, 7) and (4, 7, 10):  
- nums[1]=1, nums[2]=4, nums[4]=7 ⇒ 4-1=3, 7-4=3  
- nums[2]=4, nums[4]=7, nums[5]=10 ⇒ 7-4=3, 10-7=3*

**Example 2:**  
Input: `nums = [4, 5, 6, 7, 8, 9]`, `diff = 2`  
Output: `2`  
*Explanation: The triplets are (4, 6, 8) and (5, 7, 9):  
- 6-4=2, 8-6=2  
- 7-5=2, 9-7=2*

**Example 3:**  
Input: `nums = [1, 2, 3, 4, 5]`, `diff = 1`  
Output: `3`  
*Explanation: The triplets are (1,2,3), (2,3,4), (3,4,5):  
- 2-1=1, 3-2=1  
- 3-2=1, 4-3=1  
- 4-3=1, 5-4=1*

### Thought Process (as if you’re the interviewee)  
To start, a brute-force approach is to check all possible triplets (i, j, k) with 0 ≤ i < j < k < n, verifying both required differences. This would need three nested loops, but with an O(n³) time complexity, which is too slow for larger inputs.

Since the array is strictly increasing, and because we only care about differences, a more efficient solution is possible:
- For every number `num` in `nums`, check if `num + diff` and `num + 2×diff` also exist in nums. If so, (num, num + diff, num + 2×diff) forms a valid triplet.
- Because the numbers are unique and the array is small (max element ≤ 200), we can use a set or boolean array for fast existence checks.

This reduces time complexity to O(n), where n is the length of nums, as each lookup is O(1).

### Corner cases to consider  
- Array with fewer than 3 numbers.
- diff = 0.
- Triplets that would overlap (doesn’t matter, count each by value, as per description).
- No valid triplets (output 0).
- Large diffs where no such jumps exist.

### Solution

```python
def arithmeticTriplets(nums, diff):
    # Store all nums for O(1) existence check
    num_set = set(nums)
    count = 0
    for num in nums:
        # Check if both the required next numbers exist
        if (num + diff) in num_set and (num + 2 * diff) in num_set:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  For each number, we perform two O(1) set lookups.
- **Space Complexity:** O(n) for the extra set used to check existence.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array was not strictly increasing?  
  *Hint: Can you still guarantee O(1) lookups? Would duplicates change the answer?*

- Could you list all the triplets, not just count them?  
  *Hint: Track (i, j, k) or their values in a list instead of just counting.*

- What if diff could be negative?  
  *Hint: Would this change how the triplets form/exist?*

### Summary
This is a classic use of the **hash set for existence check** technique—often called "Hashing for fast lookups"—to reduce otherwise expensive triple nested loops down to a linear time algorithm. Variations of this pattern are common in substring/sequence detection and sum or difference-based problems.


### Flashcard
Convert nums to a set; for each num, check if num + diff and num + 2×diff exist in set—count such triplets. O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Enumeration(#enumeration)

### Similar Problems
- Two Sum(two-sum) (Easy)
- 3Sum(3sum) (Medium)
- Number of Unequal Triplets in Array(number-of-unequal-triplets-in-array) (Easy)
- Maximum Value of an Ordered Triplet I(maximum-value-of-an-ordered-triplet-i) (Easy)
- Minimum Sum of Mountain Triplets I(minimum-sum-of-mountain-triplets-i) (Easy)