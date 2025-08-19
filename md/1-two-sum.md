### Leetcode 1 (Easy): Two Sum [Practice](https://leetcode.com/problems/two-sum)

### Description  
Given an array of integers (nums) and a target integer, return the indices of the two numbers such that they add up to the target. You may not use the same element twice. Assume exactly one solution exists. The pair can be returned in any order—as long as the indices are correct.

### Examples  

**Example 1:**  
Input: `nums = [2,7,11,15]`, `target = 9`  
Output: `[0,1]`  
*Explanation: nums + nums[1] = 2 + 7 = 9. Return [0,1].*

**Example 2:**  
Input: `nums = [3,2,4]`, `target = 6`  
Output: `[1,2]`  
*Explanation: nums[1] + nums[2] = 2 + 4 = 6. Return [1,2].*

**Example 3:**  
Input: `nums = [3,3]`, `target = 6`  
Output: `[0,1]`  
*Explanation: nums + nums[1] = 3 + 3 = 6. Return [0,1].*


### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try every possible pair (i, j) (0 ≤ i < j < n), check if nums[i] + nums[j] == target.  
  This has O(n²) time complexity, since for each element we loop through the rest of the array.

- **Optimized approach:**  
  Use a hash map to store previously seen numbers and their indices.  
  For each element, compute its complement (target - nums[i]).  
  If the complement is already in the hash map, we've found our answer.  
  Otherwise, add nums[i] along with its index to the hash map.  
  This approach traverses the array just once, making it much more efficient (O(n) time) and simple.

- **Trade-offs:**  
  - Brute force is simple but too slow for larger arrays.  
  - Hash map approach uses extra space (O(n)), but that's well worth it for huge speed gains.  
  - This method guarantees we don't use the same element twice, as we add the current element to the hash only after checking for its complement.

### Corner cases to consider  
- Empty array: nums = [], target = X  
- Array with one element: nums = [5], target = 5  
- Duplicates: nums = [3,3], target = 6  
- Negative numbers and zeros  
- All numbers same, and more than one valid pair—should only return first correct pair by index  
- No solution: As per constraints, always one solution, but in production code, should handle gracefully

### Solution

```python
def two_sum(nums, target):
    # Hash map to store value: index
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            # Found the pair
            return [lookup[complement], i]
        # Store index of current element
        lookup[num] = i
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the array once. All hash table operations (lookup & insert) are O(1) on average.

- **Space Complexity:** O(n)  
  In the worst case, we store all n elements in the hash map.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is sorted?  
  *Hint: Can you use a two-pointer approach then?*

- What if you need to return all unique pairs, not just the first one?  
  *Hint: Iterate and track visited pairs, consider duplicates.*

- What if no valid pair exists?  
  *Hint: Should the function return None/an empty list/an error, depending on needs?*

### Summary
This problem is a classic example of the **hash map** (dictionary) lookup pattern.  
It's foundational for interview prep, and the same pattern appears in related problems like "Two Sum II" (sorted input), subsets with given sum, and pair-finding for other constraints.  
Hash maps are the natural solution for complement-type array problems—recognize and apply this template widely.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- 3Sum(3sum) (Medium)
- 4Sum(4sum) (Medium)
- Two Sum II - Input Array Is Sorted(two-sum-ii-input-array-is-sorted) (Medium)
- Two Sum III - Data structure design(two-sum-iii-data-structure-design) (Easy)
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Two Sum IV - Input is a BST(two-sum-iv-input-is-a-bst) (Easy)
- Two Sum Less Than K(two-sum-less-than-k) (Easy)
- Max Number of K-Sum Pairs(max-number-of-k-sum-pairs) (Medium)
- Count Good Meals(count-good-meals) (Medium)
- Count Number of Pairs With Absolute Difference K(count-number-of-pairs-with-absolute-difference-k) (Easy)
- Number of Pairs of Strings With Concatenation Equal to Target(number-of-pairs-of-strings-with-concatenation-equal-to-target) (Medium)
- Find All K-Distant Indices in an Array(find-all-k-distant-indices-in-an-array) (Easy)
- First Letter to Appear Twice(first-letter-to-appear-twice) (Easy)
- Number of Excellent Pairs(number-of-excellent-pairs) (Hard)
- Number of Arithmetic Triplets(number-of-arithmetic-triplets) (Easy)
- Node With Highest Edge Score(node-with-highest-edge-score) (Medium)
- Check Distances Between Same Letters(check-distances-between-same-letters) (Easy)
- Find Subarrays With Equal Sum(find-subarrays-with-equal-sum) (Easy)
- Largest Positive Integer That Exists With Its Negative(largest-positive-integer-that-exists-with-its-negative) (Easy)
- Number of Distinct Averages(number-of-distinct-averages) (Easy)
- Count Pairs Whose Sum is Less than Target(count-pairs-whose-sum-is-less-than-target) (Easy)