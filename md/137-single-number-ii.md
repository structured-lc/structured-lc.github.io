### Leetcode 137 (Medium): Single Number II [Practice](https://leetcode.com/problems/single-number-ii)

### Description  
Given an array of integers, every element appears exactly three times except for one. Find that single one, which appears only once. You must solve this problem using only constant extra space and linear time.  
Rephrase (for interview):  
You're given a list of integers where *every element appears three times except one*, which appears exactly once. Return that unique number. Extra challenge: do this with O(1) extra space.

### Examples  

**Example 1:**  
Input: `[2,2,3,2]`,  
Output: `3`  
*Explanation: 2 appears three times, 3 appears once. So, return 3.*

**Example 2:**  
Input: `[0,1,0,1,0,1,99]`,  
Output: `99`  
*Explanation: Every number except 99 appears three times; 99 appears once.*

**Example 3:**  
Input: `[-2,-2,1,1,-3,1,-3,-3,-4,-2]`,  
Output: `-4`  
*Explanation: All numbers appear three times except -4, which appears once.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Count how many times each number appears using a hash map. The number with count 1 is the answer.  
    - Time: O(n), Space: O(n).
    - Not acceptable since we need constant space.

- **Sort and check neighbors:** Sorting gives O(n log n) time — still not optimal and uses more than O(1) space for some languages.

- **Bitwise Counting (Optimal):**  
    - **Observation:** For each bit position, the set bits count is a multiple of 3 for numbers present thrice.  
    - For the unique number, at some bit positions, the total count isn’t a multiple of 3.
    - So, count the number of set bits in each position (0-31), mod by 3, and reconstruct the result.
    - The remaining set bits after mod 3 belong to the single number.

- **Optimized Bit Manipulation with Two Variables:**  
    - Maintain two variables (`ones`, `twos`) to track counts of bits occurring once and twice. Mask out all bits that appear three times.
    - At the end, `ones` holds the unique number.
    - This works by clever bitwise state transitions and is O(1) space.

*Trade-offs:* Hashmap is easier, but bitwise is required for O(1) space.

### Corner cases to consider  
- Array with only one number.
- Negative numbers and zero.
- All numbers the same except the single one.
- Input with very large/small integers.
- The unique number is 0.
- Very large arrays (to test time/space limits).

### Solution

```python
def singleNumber(nums):
    # Initialize two variables to keep track of bits seen once and twice
    ones = 0
    twos = 0
    for num in nums:
        # Update 'ones' with those bits that have appeared once so far
        ones = (ones ^ num) & ~twos
        # Update 'twos' with those bits that have appeared twice so far
        twos = (twos ^ num) & ~ones
    # At the end, 'ones' has the unique number
    return ones
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is processed in constant time using bitwise operations.

- **Space Complexity:** O(1)  
  Only two integer variables (ones, twos) are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if every element appears *k* times except one?
  *Hint: How can you generalize your bit-counting method to work for any k > 1?*

- Can you solve this if two elements appear once and the rest appear three times?
  *Hint: XOR-based logic or adapt bit-counting for two single numbers?*

- What if you’re constrained by streaming input (you can only process numbers one at a time, not store entire array)?
  *Hint: Can your bit-tracking state be updated online?*

### Summary
This problem uses the **Bit Manipulation** and **Bitwise Counting** pattern, optimizing for O(1) space by tracking the number of times each bit appears using just two integer variables. This approach is a classic trick useful for similar problems where numbers appear *k* times and you need the unique element. This technique can also be adapted for other values of *k*, making it a broadly applicable pattern for interview settings.