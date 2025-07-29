### Leetcode 2475 (Easy): Number of Unequal Triplets in Array [Practice](https://leetcode.com/problems/number-of-unequal-triplets-in-array)

### Description  
Given an array of positive integers `nums`, count the number of triplets (i, j, k) such that:
- 0 ≤ i < j < k < n
- All three values are different, i.e., nums[i] ≠ nums[j], nums[i] ≠ nums[k], and nums[j] ≠ nums[k]

In other words: How many ways can you choose three different indices from the array such that the numbers at those indices are all pairwise distinct?

### Examples  

**Example 1:**  
Input: `nums = [4,4,2,4,3]`  
Output: `3`  
Explanation:  
Valid triplets are (0,2,4), (1,2,4), and (3,2,4). For each, the numbers picked are 4,2,3 (all distinct).

**Example 2:**  
Input: `nums = [1,1,1,1,1]`  
Output: `0`  
Explanation:  
There are no triplets with all different values; all numbers are the same.

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `1`  
Explanation:  
Only one triplet: (0,1,2) with values 1,2,3.

### Thought Process (as if you’re the interviewee)  
First, I’d consider a brute-force approach: try every possible triplet (i, j, k) and for each, check if all 3 values are distinct. That would work because n is small (n ≤ 100), but it’s O(n³), which is not efficient for larger inputs.

To optimize:
- If we know the frequency of each unique number in the array, we can calculate the number of valid triplets by picking one index from 3 *different* values.
- For each unique value, let’s iterate in order:  
  * Before each step, let’s say “left” is the total number of indices already seen, “curr” is the frequency of the current value, and “right” is the total number of not-yet-seen indices (the rest).
  * For each current value, the number of triplets where the three numbers are different and the current number is the middle value is: left × curr × right.
  * We can accumulate this for all values.

This reduces the complexity to O(n + k), where k is the number of unique elements.

### Corner cases to consider  
- All elements are the same: output should be 0.
- All elements are unique: there are n choose 3 triplets.
- Array size less than 3: cannot pick a triplet.
- Some numbers have high frequency; the rest are unique.
- Array where only two different numbers exist.

### Solution

```python
def unequalTriplets(nums):
    # Count frequency of each unique number
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    
    n = len(nums)
    ans = 0
    left = 0
    
    # Iterate over the frequencies
    for count in freq.values():
        # n - left - count is the number of numbers after current group
        right = n - left - count
        # left × count × right gives triplets for this partition
        ans += left * count * right
        # Add count to left for next group
        left += count
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the size of nums.  
  We count frequencies in one pass (O(n)), then process unique values (at most n).
- **Space Complexity:** O(k), where k is the number of unique elements.
  We store frequencies in a hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can be much larger (n up to 10⁵+)?  
  *Hint: Can you still do this in O(n) by just counting frequencies?*

- If triplets can have duplicate numbers (e.g., only two values can repeat), how would you count those?  
  *Hint: Consider calculating all triplets, then subtract those with duplicate values.*

- Can you return the list of all such triplets instead of just the count?  
  *Hint: For large n, listing is infeasible; but for small n, it’s possible using brute force.*

### Summary
This problem uses the **counting by frequency** pattern, separating the array into partitions and using combinatorics to count valid combinations efficiently instead of brute-force enumeration. The same pattern appears in problems that ask for counting unique pairs or triplets with specific constraints based on occurrences.