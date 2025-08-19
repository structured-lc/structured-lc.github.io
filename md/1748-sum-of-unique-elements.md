### Leetcode 1748 (Easy): Sum of Unique Elements [Practice](https://leetcode.com/problems/sum-of-unique-elements)

### Description  
Given an array of integers, return the sum of elements that are **unique** (elements that occur exactly once in the array). If no unique elements exist, return 0.  
Example:  
If nums = [1, 2, 2, 3, 4], only 1, 3, and 4 are unique, so return 8.  
This is a frequency-counting question: count how many times each value appears and add each one to the sum only if it appears exactly once.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,2]`  
Output: `4`  
*Explanation: Only 1 and 3 occur once, sum = 1 + 3 = 4.*

**Example 2:**  
Input: `nums = [1,1,1,1,1]`  
Output: `0`  
*Explanation: No number occurs exactly once, so the sum is 0.*

**Example 3:**  
Input: `nums = [1,2,3,4,5]`  
Output: `15`  
*Explanation: All numbers are unique, so sum = 1 + 2 + 3 + 4 + 5 = 15.*


### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For every element in the array, count its occurrences by scanning the entire array. If it appears once, add it to the sum.  
  Time: O(n²), because for every element, we may scan the entire array.

- **Optimized Approach (using Hash Map or Frequency Array):**  
  Scan the array once to count the frequency of each number.
  Then scan the frequency table and sum values appearing only once.
  Since constraints are small (1 ≤ nums.length ≤ 100 and 1 ≤ nums[i] ≤ 100), we can actually use a plain integer array of size 101 to store counts instead of a hash map.
  This makes counting/lookup O(1) and the total solution O(n).

- **Why this approach:**  
  - Space is tiny and fixed (at most 101 for values and 101 for counts).
  - Counting frequencies and adding up unique numbers are both quick.
  - More readable and less error prone than the brute-force double loop.

### Corner cases to consider  
- Empty array: should return 0.
- All elements are the same (e.g., [1,1,1,1]): output = 0.
- All elements unique: input=[1,2,3,4], output=10.
- Single element (e.g., ): output = 42.
- Multiple pairs, only one unique (e.g., [2,2,3,4,4]): output = 3.

### Solution

```python
def sumOfUnique(nums):
    # Create a frequency array to count occurrences of each number
    freq = [0] * 101  # Since 1 ≤ nums[i] ≤ 100
    for num in nums:
        freq[num] += 1

    # Sum up numbers that appear exactly once
    total = 0
    for num in nums:
        if freq[num] == 1:
            total += num
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We pass through the list once to count, and once (at most) to sum, so total time is linear in n (array size).
- **Space Complexity:** O(1) — The frequency array is always of length 101, regardless of input size, so space does **not** grow with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the values in nums can be negative or much larger than 100?  
  *Hint: Would a hash map or dictionary be needed instead of a fixed array?*

- Can you solve this problem in a single pass and without extra space?  
  *Hint: Is it possible if the array is already sorted, or can you sort the input?*

- What is the maximum possible sum you could return based on array length and value constraints?  
  *Hint: Try constructing the largest sum by picking all distinct elements from 1 to 100.*

### Summary
This problem uses the **frequency counting pattern**, a powerful and efficient way to detect unique elements in a collection.  
It is especially simple here because of the tight value range. This approach is widely applicable to similar problems, such as finding duplicates, missing values, or any kind of element frequency analysis in arrays. The pattern shines most when you are asked for “uniqueness”, “duplicates”, or “frequency-related” questions in interview or coding contests.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
