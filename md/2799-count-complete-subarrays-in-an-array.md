### Leetcode 2799 (Medium): Count Complete Subarrays in an Array [Practice](https://leetcode.com/problems/count-complete-subarrays-in-an-array)

### Description  
Given an array of positive integers `nums`, a subarray is called **complete** if the number of distinct elements in that subarray is the same as the number of distinct elements in the entire array.  
You need to count how many complete subarrays exist in `nums`.

Simply put:  
A subarray `[i, j]` is considered complete if the set of elements in `[i, j]` exactly has as many distinct numbers as in the whole `nums` array.

### Examples  

**Example 1:**  
Input: `nums = [1, 3, 1, 2, 2]`  
Output: `4`  
*Explanation: The total number of distinct numbers in the full array is 3 (1, 2, 3). The subarrays that have exactly 3 distinct elements are:*
- `[1,3,1,2]`
- `[3,1,2]`
- `[1,3,1,2,2]`
- `[3,1,2,2]`

**Example 2:**  
Input: `nums = [5,5,5,5]`  
Output: `10`  
*Explanation: The whole array only has one distinct number (5). All possible subarrays have exactly one distinct element, so every subarray is complete. Total number of subarrays for n=4 is 4+3+2+1 = 10.*

**Example 3:**  
Input: `nums = [2,1,3]`  
Output: `3`  
*Explanation: Every subarray of length 3 contains all distinct elements (2,1,3): `[2,1,3]`, `[1,3]`, `[2,1]`. But only `[2,1,3]` is complete by definition. If we consider only those subarrays that match the global unique count, we get 3 complete subarrays: `[2,1,3]`, `[2,1,3]`, `[2,1,3]`.*

### Thought Process (as if you’re the interviewee)  
- First idea: **Brute Force**. For every possible subarray, count the number of distinct elements and compare to the full array’s unique count. For size n, would need O(n²) subarrays, and O(n) to count unique elements for each one, resulting in O(n³) time.
- **Not efficient** for large n (up to 10⁴).
- Optimization: recognize it’s about finding subarrays with exactly K distinct values where K = total unique in nums.
- This looks like a **sliding window** pattern. For many “subarrays with at most K distinct” problems, we use two pointers and a frequency table.
- To **count all windows with exactly K unique elements:**  
  - For each left pointer i, move the right pointer j as far as you can such that the window [i, j] has exactly K unique numbers.  
  - For every such window, all subarrays from j to end of array with same left i will also be complete, since adding more letters after j can't change the unique count.  
  - So, for each valid window, add (n - j) to count.
- Use a frequency dictionary to track occurrences in current window, and move the left pointer to shrink window and update dictionary accordingly.
- This approach is O(n) if implemented efficiently since every element is processed at most twice.

### Corner cases to consider  
- Empty array (`[]`)
- Array with all elements equal, e.g. `[7,7,7]`
- Array with all unique elements, e.g. `[1,2,3,4,5]`
- Array of length 1, e.g. ``
- Arrays with multiple periods of repetition, e.g. `[1,2,1,2,1,2]`

### Solution

```python
def countCompleteSubarrays(nums):
    n = len(nums)
    # Count total distinct elements in the entire array
    unique_total = len(set(nums))
    ans = 0
    
    # Use two pointers (sliding window)
    for left in range(n):
        freq = {}      # key: num, value: occurrences in current window
        unique_count = 0
        
        for right in range(left, n):
            num = nums[right]
            if num not in freq:
                freq[num] = 0
                unique_count += 1
            freq[num] += 1
            
            if unique_count == unique_total:
                # All subarrays starting at left and ending at (right...n-1)
                # will have the complete set, since adding more elements can't
                # remove any distinct numbers.
                ans += (n - right)
                break  # Done for this starting index 'left', move to next
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Outer loop runs n times, inner loop could run up to n times, but breaks as soon as window is complete. In the worst case (many identical elements), it’s still O(n²).  
  While there is a more advanced O(n) approach using prefix counts and inclusion-exclusion (not shown here), this simple method is accepted for reasonable constraints.
- **Space Complexity:** O(n)  
  Frequency dictionary per window uses up to n distinct elements in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize to O(n) time for this problem?  
  *Hint: Use the idea from “number of subarrays with at most K distinct elements” and inclusion-exclusion between atMost(K) and atMost(K-1).*

- Can you do this in-place or with minimum extra memory?  
  *Hint: Consider if you really need to copy/set new hashmaps every iteration.*

- How would you find the *longest* complete subarray instead?  
  *Hint: Instead of counting, track window length retaining all unique elements.*

### Summary
The core pattern here is **sliding window with hash tables** to count the number of unique elements efficiently.  
This algorithm is a classic example of subarray counting with unique element constraints and can be applied to many problems about at most/exactly K distinct values in subarrays or substrings (substring with K unique chars, shortest complete window, etc).  
For full optimization, combine atMost(K) – atMost(K-1) counting using advanced windowing.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Subarrays with K Different Integers(subarrays-with-k-different-integers) (Hard)