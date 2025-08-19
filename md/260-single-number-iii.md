### Leetcode 260 (Medium): Single Number III [Practice](https://leetcode.com/problems/single-number-iii)

### Description  
Given an integer array, every element appears exactly twice except for **two elements**, which appear only once. Find and return those two unique elements.  
Return the result in any order.  
*All other elements repeat exactly twice; only two are single-occurrence.*

### Examples  

**Example 1:**  
Input: `[1,2,1,3,2,5]`  
Output: `[3,5]`  
*Explanation: 1 and 2 are repeated, so they're not unique. Leftover numbers are 3 and 5.*

**Example 2:**  
Input: `[-1,0]`  
Output: `[-1,0]`  
*Explanation: Both -1 and 0 occur once; either order is valid.*

**Example 3:**  
Input: `[0,1]`  
Output: `[1,0]`  
*Explanation: Each only occurs once, so return both.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For each number, count occurrences. If a number occurs once, it’s a solution. This requires counting every element (O(n²) without hash map, O(n) with hash map) and storing frequencies.
  - *Cons*: Needs extra space for the hash map (O(n)). Not optimal.

- **XOR-based Optimization:**  
  All duplicate numbers (seen exactly twice) can be cancelled out using bitwise XOR: a ⊕ a = 0.  
  - XOR all elements: You get result = unique₁ ⊕ unique₂.
  - These two unique numbers differ at some bit position: **at least one bit is different**.
  - Find any set bit (e.g., least significant set bit) in the XOR: this distinguishes the two numbers at that position.
  - Separate numbers into two groups: those with this bit set, those without.  
    - Each group now contains only one unique and all the pairs that will XOR to zero.
  - XOR numbers within each group: Each group cancels out duplicates, so only the unique remains.

- **Why choose this?**  
  - **O(n) time, O(1) extra space.**  
  - No hash map/memory constraint, just a few variables.  
  - Uses only bit manipulation and a couple passes through the array.

### Corner cases to consider  
- Very small arrays (minimum viable input)
- All numbers negative
- Unique numbers are at the ends, or same values but swapped ([2,3,3,2,5,6])
- Zero is involved as unique (e.g., [0,1,1,2,2,3])
- Large numbers, integer limits

### Solution

```python
def singleNumber(nums):
    # Step 1: XOR all numbers
    xor = 0
    for num in nums:
        xor ^= num  # All pairs cancel out, left with unique₁ ^ unique₂

    # Step 2: Find a set bit (where the two uniques differ)
    # This gets the "rightmost set bit" in xor
    diff_bit = xor & -xor

    # Step 3: Divide numbers into two groups by that bit, XOR within each group
    unique1 = 0
    unique2 = 0
    for num in nums:
        if num & diff_bit:
            unique1 ^= num  # Group with the distinguishing bit set
        else:
            unique2 ^= num  # Group without that bit set

    return [unique1, unique2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - One pass to XOR all elements, another pass to partition and XOR again.

- **Space Complexity:** O(1)  
  - Only variables for result, no extra data structures (ignoring input array).

### Potential follow-up questions (as if you’re the interviewer)  

- *What if instead of two, there are k numbers that appear only once?*  
  *Hint: Can you generalize the technique? What if k=3?*

- *Can you do this if the input stream is too large to fit in memory?*  
  *Hint: How would you adapt your algorithm or split the data?*

- *Could you adapt this to a language without bit manipulation operators?*  
  *Hint: Is there an equivalent mathematical trick, or must you revert to hash maps?*

### Summary
Uses the **bit manipulation/XOR pattern**:
- Identifies unique elements where all others appear in even pairs.
- Leverages the property that x ⊕ x = 0 and x ⊕ 0 = x.
- Finds the distinguishing bit between uniques, partitions, and reveals each by cancellation in group.  
This bitwise pattern is widely used (Single Number I, II, appearing once/twice/three times), and is a frequent trick for *finding unpaired elements* efficiently.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Single Number(single-number) (Easy)
- Single Number II(single-number-ii) (Medium)
- Find The Original Array of Prefix Xor(find-the-original-array-of-prefix-xor) (Medium)
- Find the XOR of Numbers Which Appear Twice(find-the-xor-of-numbers-which-appear-twice) (Easy)