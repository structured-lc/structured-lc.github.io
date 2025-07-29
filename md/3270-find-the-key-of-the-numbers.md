### Leetcode 3270 (Easy): Find the Key of the Numbers [Practice](https://leetcode.com/problems/find-the-key-of-the-numbers)

### Description  
You are given three positive integers: **num1**, **num2**, and **num3**.  
- Pad each number with leading zeros so each is 4 digits long.  
- The iᵗʰ digit of the result (**key**) is the smallest among the iᵗʰ digits of the padded num1, num2, num3.  
- The returned key should NOT have leading zeros.

For example, for input 1, 10, 1000:  
- Pad as 0001, 0010, 1000  
- For each digit position, take min of corresponding digits: min(0,0,1), min(0,0,0), min(0,1,0), min(1,0,0)

### Examples  

**Example 1:**  
Input: `num1=1, num2=10, num3=1000`  
Output: `0`  
*Explanation: Padded: 0001, 0010, 1000.  
i=0:min(0,0,1)=0, i=1:min(0,0,0)=0, i=2:min(0,1,0)=0, i=3:min(1,0,0)=0.  
=> "0000", which as an integer is 0.*

**Example 2:**  
Input: `num1=9123, num2=3123, num3=2123`  
Output: `2123`  
*Explanation: Numbers already 4 digits.  
i=0:min(9,3,2)=2, i=1:min(1,1,1)=1, i=2:min(2,2,2)=2, i=3:min(3,3,3)=3.  
=> "2123".*

**Example 3:**  
Input: `num1=12, num2=34, num3=56`  
Output: `12`  
*Explanation: Padded: 0012, 0034, 0056  
i=0:min(0,0,0)=0, i=1:min(0,0,0)=0, i=2:min(1,3,5)=1, i=3:min(2,4,6)=2.  
=> "0012", output is 12.*

### Thought Process (as if you’re the interviewee)  
- Start by converting all input numbers to 4-digit strings with leading zeros.
- Compare at each digit index (from left to right): for each position, take min of all three.
- Append each minimum to a result string.
- After collecting all digits, convert result to int to strip any leading zeros.
- **Brute-force**: Manually padding numbers, comparing each digit (O(1) since input is size-fixed).
- **Optimization**: As numbers are never more than 4 digits, can process as strings rather than repeatedly extracting digits mathematically.

### Corner cases to consider  
- **All numbers single-digit** (e.g. num1=1, num2=2, num3=3)
- **Numbers with leading zeros after padding**  
- **All digits result in zero** (all input digits at a position are 0)
- **Key itself is 0**  
- **One element is much larger (e.g. more than 4 digits), although inputs are positive integers as per problem.**  
- **All numbers already 4-digit**

### Solution

```python
def findTheKey(num1, num2, num3):
    # Pad each number as a string to 4 digits
    s1 = str(num1).zfill(4)
    s2 = str(num2).zfill(4)
    s3 = str(num3).zfill(4)
    
    # List for the result digits
    res = []
    # For each digit index 0 to 3
    for i in range(4):
        # Find min digit among the three numbers at this index
        min_digit = min(int(s1[i]), int(s2[i]), int(s3[i]))
        res.append(str(min_digit))
    
    # Join digits and convert to int to strip possible leading zeros
    return int("".join(res))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Operations are fixed (always 4 digits).
- **Space Complexity:** O(1) — Only a few fixed-length strings and list for 4 digits.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of 3 numbers, you had N numbers?
  *Hint: Use a loop over N, possibly transpose a matrix of digits.*

- How would you handle very large input numbers (more than 4 digits)?
  *Hint: Generalize to length L, and pad all to same length.*

- What is the result if all corresponding digits are equal in all numbers?
  *Hint: The key is simply the original digits.*

### Summary
This problem exemplifies the **per-digit transformation** pattern, often used in digital signal processing or string-to-number algorithm questions. Key steps are standardization (pad), per-index (column) min, and appropriate conversion to ensure no leading zeros. Variants of this approach occur in coordinate-wise problems and digital manipulation tasks.