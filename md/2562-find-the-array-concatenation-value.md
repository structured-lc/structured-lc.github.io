### Leetcode 2562 (Easy): Find the Array Concatenation Value [Practice](https://leetcode.com/problems/find-the-array-concatenation-value)

### Description  
Given an integer array, repeatedly concatenate the first and last element (as strings), add that value to a running sum, and remove both elements from the array. If only one element remains, add its value (not its string form) to the result and stop. Return the final sum.  
For example:  
If the array is [7,52,2,4],  
1. Take 7 and 4, concat as '74', add 74 to answer  
2. Take 52 and 2, concat as '522', add 522 to answer  
3. Now array is empty: final sum is 74+522=596.

### Examples  

**Example 1:**  
Input: `nums = [7,52,2,4]`  
Output: `596`  
*Explanation: 7 + 4 → '74', 52 + 2 → '522'. 74 + 522 = 596.*

**Example 2:**  
Input: `nums = [5,14,13,8,12]`  
Output: `673`  
*Explanation: 5 + 12 → '512', 14 + 8 → '148', 13 remains. 512 + 148 + 13 = 673.*

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `24`  
*Explanation: 1 + 3 → '13', 2 remains. 13 + 2 = 15.*

### Thought Process (as if you’re the interviewee)  
- I need to process elements from both ends toward the center, pairing and concatenating them as strings, and then summing up their integer values.
- For odd-length arrays, the middle value is just added as is.
- I can use two pointers: left (start) and right (end). While left < right, concatenate nums[left] + nums[right] as strings, convert to integer, add to sum, and move inward. If left == right (one unpaired element left), add its value directly.
- This is a classic simulation problem and single-pass two-pointer technique.

Brute-force would be repeatedly popping elements from both ends, but that’s O(n), and using pointers avoids unnecessary array mutation.

### Corner cases to consider  
- Empty array: should return 0.
- One element: should just add that element.
- Negative numbers: concatenation with negatives (e.g. -5 and 10) – should behave as string concatenation of signed numbers.
- Array with zeros.
- Odd and even length arrays.

### Solution

```python
def findTheArrayConcVal(nums):
    total = 0
    left, right = 0, len(nums) - 1
    while left < right:
        # Concatenate left and right values as strings, then convert back to int
        concat_val = int(str(nums[left]) + str(nums[right]))
        total += concat_val
        left += 1
        right -= 1
    # If there's a middle element not paired yet (odd length)
    if left == right:
        total += nums[left]
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is used at most once, and string concatenation + int conversion is O(1) since number length is bounded by log₁₀M (M = max number of digits).
- **Space Complexity:** O(1) extra space (not counting input) since we just use counters and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers are very large?  
  *Hint: How do you handle integer overflow or very long numbers?*

- Can you implement it without converting numbers to strings?  
  *Hint: Count the number of digits in nums[right] and multiply nums[left] appropriately before adding.*

- How would you modify this if the concatenation order was reversed (right + left)?  
  *Hint: Switch the string concatenation order or adjust digit multiplication accordingly.*

### Summary
A classic simulation and two-pointer pattern: process from both ends, concatenate as strings, and sum up results. Common for problems involving "process paired ends" or "mirror operations," like palindromes, merging intervals, or symmetric traversal. The trick is careful handling for the final unpaired element and efficient pointer logic.


### Flashcard
Use two pointers to pair and concatenate numbers from both ends, sum the results, and add the middle element if array length is odd.

### Tags
Array(#array), Two Pointers(#two-pointers), Simulation(#simulation)

### Similar Problems
