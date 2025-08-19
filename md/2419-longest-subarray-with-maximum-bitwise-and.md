### Leetcode 2419 (Medium): Longest Subarray With Maximum Bitwise AND [Practice](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and)

### Description  
Given an integer array `nums`, find the maximum value achievable as the **bitwise AND** of any non-empty subarray of `nums`. Then, among all subarrays whose elements' bitwise AND equals this maximum value, return the length of the longest such subarray.

To clarify:  
- The bitwise AND of a subarray is the result of applying the '&' operation on all its elements.
- A subarray must be contiguous.
- You want the **longest length** where the subarray's AND matches the best (largest) possible AND value from any subarray.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,3,2,2]`  
Output: `2`  
*Explanation: The maximum possible bitwise AND is 3. The subarray [3,3] yields this AND. Its length is 2.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `1`  
*Explanation: The maximum AND is 4 (from subarray [4]). The longest such subarray has length 1.*

**Example 3:**  
Input: `nums = [2,2,2]`  
Output: `3`  
*Explanation: The maximum AND is 2. All elements are 2, so the whole array ([2,2,2]) yields 2 with a length of 3.*


### Thought Process (as if you’re the interviewee)  
Start by understanding the bitwise AND operation:
- Bitwise AND of numbers is never greater than any of the numbers involved.
- For multiple numbers, having all of them the same and equal to the maximum gives the largest AND possible.
- If you mix a smaller number, the AND result drops.

**Brute-force:**  
Try all subarrays, compute their AND, track (1) the largest value, and (2) the maximal length for that value.  
- This is O(n²) or worse, not practical for large input.

**Optimize:**  
Notice that the largest AND value achievable in any subarray is just the maximum element in `nums`.
- To keep the AND at the maximum, a subarray must only contain that value, repeated.
- The problem reduces to finding the **longest block of contiguous elements equal to max(nums)**.

**Algorithm:**  
- Find max_val = max(nums).
- Scan `nums`, count the longest contiguous sequence of max_val.
- Output that count.

**Trade-offs:**  
- This skips truly iterating over all subarrays, but works because any lesser element would instantly drop the AND below max.
- Final complexity: O(n) time, O(1) space.

### Corner cases to consider  
- Empty array (invalid per constraints, but mention).
- All elements equal.
- Only one element.
- Multiple, non-adjacent groups of the maximum value.
- Maximum value appears only once.
- Maximum only at the ends.

### Solution

```python
def longest_subarray(nums):
    # Find the maximum element in nums
    max_val = max(nums)
    max_len = 0
    cur_len = 0
    
    # Iterate through nums to find the longest contiguous block of max_val
    for num in nums:
        if num == max_val:
            cur_len += 1   # Increase current length
            if cur_len > max_len:
                max_len = cur_len
        else:
            cur_len = 0    # Reset if we hit a smaller value
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums. Each element is checked once to find max and once to count.
- **Space Complexity:** O(1), only a constant amount of extra storage (three integers).

### Potential follow-up questions (as if you’re the interviewer)  

- What if 'bitwise AND' was replaced with 'bitwise OR'?  
  *Hint: How do runs of 1’s in binary OR behave?*

- Can you return all the subarrays with the maximum AND value instead of just the length?  
  *Hint: Modify your loop to track the start and end indices.*

- How would the problem change if elements could be negative?  
  *Hint: Consider how Python represents negatives in binary and how AND would behave.*

### Summary
This problem uses a simple sliding window/counting pattern, detecting the longest stretch of a repeated value. It’s a classic search for the longest block of a property (e.g., all 1’s, longest plateau) and shows how recognizing bitwise rules (AND can only decrease) lets you trim brute-force approaches into a clean O(n) sweep. This pattern applies to many substring/subarray search problems involving uniformity or max/min runs, such as maximum consecutive ones or zeros.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Brainteaser(#brainteaser)

### Similar Problems
- Number of Different Integers in a String(number-of-different-integers-in-a-string) (Easy)
- Remove Colored Pieces if Both Neighbors are the Same Color(remove-colored-pieces-if-both-neighbors-are-the-same-color) (Medium)
- Count Number of Maximum Bitwise-OR Subsets(count-number-of-maximum-bitwise-or-subsets) (Medium)
- Smallest Subarrays With Maximum Bitwise OR(smallest-subarrays-with-maximum-bitwise-or) (Medium)