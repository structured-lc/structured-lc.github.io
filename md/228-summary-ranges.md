### Leetcode 228 (Easy): Summary Ranges [Practice](https://leetcode.com/problems/summary-ranges)

### Description  
Given a **sorted** array of unique integers, return the smallest sorted list of string ranges that precisely cover all numbers in the array. For any consecutive sequence, represent it as "a->b". If a number stands alone, represent it as just "a". Each number must be included in exactly one range, and no extra numbers appear in the ranges.

### Examples  

**Example 1:**  
Input: `[0,1,2,4,5,7]`  
Output: `["0->2","4->5","7"]`  
*Explanation: `0,1,2` are consecutive, so "0->2"; then `4,5` are consecutive, so "4->5"; `7` stands alone, so just "7".*

**Example 2:**  
Input: `[0,2,3,4,6,8,9]`  
Output: `["0","2->4","6","8->9"]`  
*Explanation: `0` is alone, so "0"; `2,3,4` are consecutive, so "2->4"; `6` stands alone, so "6"; `8,9` are consecutive, so "8->9".*

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: The input is empty, so output an empty list.*

### Thought Process (as if you’re the interviewee)  
The array is sorted and has unique elements.  
- My brute-force idea: Start from each number and keep checking consecutive numbers to form ranges, adding them to the output.
- I can use two pointers: one to track the range start, another to move through the sequence.  
- For each group of consecutive numbers (where the next number is prev+1), extend the range; when a gap is found, add the current range.
- This only requires a single pass through the list (O(n)).

I'll avoid shortcuts with libraries, as in a real interview. This two-pointer scanning is efficient and directly implements the problem's requirements.

### Corner cases to consider  
- Empty array → Should return an empty list.
- One element → Should return a list with that single number as a string.
- All elements consecutive → Just one range as output.
- No consecutive numbers → Each number appears as a single-element string.
- Negative numbers.
- Large gaps between numbers.
- Array with min or max integer boundaries.

### Solution

```python
def summaryRanges(nums):
    # Prepare the answer list
    result = []
    n = len(nums)
    i = 0
    
    # Iterate while there are elements left
    while i < n:
        start = i  # Start of current range
        
        # Move i forward as long as next is consecutive
        while i + 1 < n and nums[i + 1] == nums[i] + 1:
            i += 1
        
        # If start == i, it's a single number
        if start == i:
            result.append(str(nums[start]))
        else:
            result.append(f"{nums[start]}->{nums[i]}")
        
        i += 1  # Move to the next range
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is visited once to build ranges.
- **Space Complexity:** O(1) extra (excluding the output), as no additional storage is used besides the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is not sorted?
  *Hint: Think about how you'd identify consecutive ranges: sorting may be necessary before running the range algorithm.*
- How would you solve it if numbers could repeat?
  *Hint: Consider deduplication, possibly using a set first, before processing ranges.*
- What if we needed to include the count of each range?
  *Hint: For each range, track and append the length/count along with the range string.*

### Summary
This problem uses a **two-pointer iteration** pattern to detect stretches of consecutive integers in a sorted array. It's a fundamental sequence-ranges pattern, often seen in interval merging, timeline grouping, and compression problems. The approach efficiently compresses consecutive values and can be adapted for similar range-grouping tasks in both interview settings and real-world applications.