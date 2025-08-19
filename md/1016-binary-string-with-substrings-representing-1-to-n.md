### Leetcode 1016 (Medium): Binary String With Substrings Representing 1 To N [Practice](https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n)

### Description  
Given a binary string **s** and an integer **n**, determine if **all** numbers from 1 to n (inclusive), when written in binary (without leading zeros), appear as substrings in **s**.  
A substring is a contiguous sequence of characters in **s**. For each 1 ≤ k ≤ n, **s** must contain the binary form of k somewhere within it.  
This checks whether **s** encodes all numbers in the specified range in its substrings.

### Examples  

**Example 1:**  
Input: `s = "0110", n = 3`  
Output: `true`  
*Explanation: The binary representations are: 1 = "1", 2 = "10", 3 = "11". All of these substrings ("1", "10", "11") are present in "0110".*

**Example 2:**  
Input: `s = "0110", n = 4`  
Output: `false`  
*Explanation: The binary representation for 4 is "100", which does not occur as a substring in "0110". So, return false.*

**Example 3:**  
Input: `s = "01101101", n = 4`  
Output: `true`  
*Explanation: Binary for 1="1", 2="10", 3="11", 4="100". All these substrings are present in "01101101".*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Iterate from 1 to n. For each integer k, convert it to binary (no leading zeros). Check if this binary string is a substring in **s** (using the `in` operator or custom logic).  
  This approach is simple but inefficient for large n (up to 10⁹), since it generates n strings and performs n substring searches.

- **Optimization:**  
  Notice that for large n, the number of possible unique substrings of s is limited by the length of s.  
  - The maximum length of any substring to check is the length of n in binary (`n.bit_length()`).
  - For each possible binary length ℓ, collect all substrings of **s** with length ℓ (using a sliding window). Store these substrings in a set.
  - For all k in [1, n], compute its binary representation, and check if that string exists in the set for its length.  
  - Also, if n is very large (e.g., n > 2 × s.length), it's impossible for all k to be present due to the limits of the string length.

- **Further optimization (observational):**  
  For very large n (e.g., n > 2 × s.length), it's impossible to contain all k, as the string is too short to represent every substring needed[3][5].

### Corner cases to consider  
- n is larger than possible (e.g., n > 2ˡ with l=s.length): too many unique numbers for s to contain.
- s is shorter than the binary representation of n.
- s contains lots of zeros; may miss certain numbers.
- n = 1 (just need substring "1")
- s only contains a single character.
- n very large, but s is very short.

### Solution

```python
def queryString(s: str, n: int) -> bool:
    # If n is too large for s to possibly contain all numbers, return False directly
    # The maximum unique substrings of length L in s is at most len(s) - L + 1
    # So if n > 2 * len(s), it's impossible to cover all; the below 1511 is a tight bound
    if n > 1511:
        return False
    
    # For all numbers k from 1 to n
    for k in range(n, 0, -1):
        bin_k = bin(k)[2:]  # get binary representation as string, no leading '0b'
        if bin_k not in s:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × L), where n is the integer input and L is the maximum length of its binary representation (about log₂(n)).  
  For each k, we check if its binary representation (length ≤ log₂(n)) is a substring of s.
  For practical constraints, when n exceeds 1511, function returns early due to impossibility[3].

- **Space Complexity:**  
  O(1) extra space, not counting the input or auxiliary variable sizes.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where n is extremely large, but s is also very long?
  *Hint: Is there a mathematical upper bound on the amount of unique binary substrings that s can contain, compared to n?*

- How could you improve performance further if allowed to preprocess s?
  *Hint: Sliding window with sets, possibly only for relevant substring lengths.*

- Could you modify this solution to find which specific numbers are missing (the “first missing k”)?
  *Hint: Instead of returning False immediately, collect “misses” into a list.*

### Summary
This approach mixes **brute-force checking** for each target binary number with a safe early-exit for impossible cases based on the size of s relative to n.  
The pattern is “string search of fixed-length targets” using direct substring queries. The problem illustrates the importance of matching achievable search space (limited by |s|) to required outcome set (numbers 1…n), and applies well to any task where needing to check coverage of all “short patterns” in a given string. This is a typical **brute-force with observation-based pruning** setup, commonly seen in substring coverage and pattern-detection problems.

### Tags
Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window)

### Similar Problems
