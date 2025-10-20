### Leetcode 136 (Easy): Single Number [Practice](https://leetcode.com/problems/single-number)

### Description  
Given a non-empty array of integers, every element appears **twice except for one**. Find that single number.  
You need to accomplish this in **O(n) time** using **constant extra space**.

Essentially, you're handed a list of numbers, all in pairs except for a lonely number that appears just once. You're to identify that unique one.

### Examples  

**Example 1:**  
Input: `[2,2,1]`  
Output: `1`  
*Explanation: Both 2's are present in pairs, but 1 appears only once. Thus, 1 is the answer.*

**Example 2:**  
Input: `[4,1,2,1,2]`  
Output: `4`  
*Explanation: 1 and 2 each appear twice. 4 appears only once.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Only one element exists; obviously, it appears once.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  I could check the count of every element, but that would require scanning the entire array for each element—O(n²) time. Not efficient, and also doesn't meet the space or time constraints.

- **HashMap/Counter:**  
  Using a dictionary or hash map, I can count occurrences of each number, then return the number with a count of one. This approach is O(n) time but requires O(n) extra space for the counts, which violates the constant space constraint.

- **Bit Manipulation (Optimal):**  
  When I read the constraint to use only constant extra space, I recall that **XOR** has a unique property:  
  - \( a \oplus a = 0 \)  
  - \( 0 \oplus b = b \)  
  - XOR is commutative and associative (order doesn't matter).
  
  Therefore, if I XOR all numbers together, pairs will cancel out (become zero), leaving only the single number as the final result.

This approach is **O(n) time** and **O(1) space**—it neatly matches all constraints and is optimal.

### Corner cases to consider  
- Array with **only one element** `[k]`
- **Negative** numbers
- Numbers at extremes of allowed values
- Very **large arrays**
- Correct handling of **odd and even-length arrays** (though by problem guarantee, always one single)

### Solution

```python
def singleNumber(nums):
    # Initialize the unique number to 0
    result = 0
    # XOR every number in the array
    for num in nums:
        result ^= num
    # The result will be the single number left
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan through the entire array exactly once, XOR'ing each number.
- **Space Complexity:** O(1) — We maintain only a single integer (`result`), regardless of input size. No additional data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve the problem if **every element appears three times except one**?
  *Hint: Try using bitwise counting for each bit position.*

- How would your approach change if the **input cannot be modified**?
  *Hint: The XOR method doesn't modify input, so it's already safe.*

- What if you were asked to find **all elements that appear only once** when others appear exactly twice?
  *Hint: Consider using a hash map or a different bitwise technique.*

### Summary
This problem is a classic application of the **Bitwise XOR pattern** for tracking duplicates in linear time with constant space. The approach is elegant and efficient, and appears frequently in interview settings—especially when constraints point towards avoiding extra space or using hash maps. This pattern can extend to more complex cases, such as when each element appears **k** times except for one.


### Flashcard
XOR all numbers together; pairs cancel out, leaving the single number that appears once.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Single Number II(single-number-ii) (Medium)
- Single Number III(single-number-iii) (Medium)
- Missing Number(missing-number) (Easy)
- Find the Duplicate Number(find-the-duplicate-number) (Medium)
- Find the Difference(find-the-difference) (Easy)
- Find the XOR of Numbers Which Appear Twice(find-the-xor-of-numbers-which-appear-twice) (Easy)