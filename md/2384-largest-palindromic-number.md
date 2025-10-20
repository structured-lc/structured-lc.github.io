### Leetcode 2384 (Medium): Largest Palindromic Number [Practice](https://leetcode.com/problems/largest-palindromic-number)

### Description  
Given a string of digits, return the **largest palindromic integer** (as a string) that can be created from some or all of those digits (by rearrangement and arbitrary selection). The answer must not contain leading zeroes, unless it is exactly "0".

Key points:
- Not all digits must be used.
- Result must not have leading zeros unless it's only "0".
- Numbers can be rearranged in any order to form the palindrome.

### Examples  

**Example 1:**  
Input: `"444947137"`  
Output: `"7449447"`  
*Explanation: Count the frequency of each digit. Pair up highest digits symmetrically ("7", "4", "9",...) and, if any unpaired digit remains, use the largest one in the center. Here, two 7s, two 4s, two 9s, and "1" in the middle gives the largest: "7449447".*

**Example 2:**  
Input: `"00009"`  
Output: `"9"`  
*Explanation: Only one "9" is nonzero. Using zeros would introduce invalid leading zeros, so the answer is simply "9".*

**Example 3:**  
Input: `"12321"`  
Output: `"32123"`  
*Explanation: Pair largest available digits on either side ("3", "2"), leaving the single "1" for the center. Thus: "32"+"1"+"23" = "32123".*

**Example 4:**  
Input: `"0000"`  
Output: `"0"`  
*Explanation: All zeros. The answer must be exactly "0"—any other form would have unwanted leading zeros.*

### Thought Process (as if you’re the interviewee)  
Start by counting the frequency of each digit.

Brute-force: Generate all permutations of all possible digit subsets, but that's extremely slow (factorial time).

Optimization:
- To maximize the number, place the largest available digits at the outside of the palindrome, mirrored.
- For each digit, use as many pairs as possible (i.e., count[digit] // 2 on each side).
- Handle the unpaired digits: Use the largest available digit (with odd count) in the center.
- Carefully avoid leading zeros: Don't allow the palindrome to start with '0' unless the answer is only "0".
- Edge case: If everything is zeros, return "0".

Why this is efficient: You only count, then assemble the answer greedily from highest digit to lowest, which is linear.

### Corner cases to consider  
- Only zeros in input ⇒ should return "0".
- Answer has leading zeros if not handled: e.g., "001100" — must not return "001100".
- Only one digit in input.
- All digits have odd count, but central digit shouldn't induce leading zero.
- Digits occur in such a way that no pairs are possible (e.g., "5", "9").

### Solution

```python
def largestPalindromic(num: str) -> str:
    # Count the occurrence of each digit (0-9)
    digit_count = [0] * 10
    for digit in num:
        digit_count[int(digit)] += 1

    left = []
    # Build left half by using as many pairs as possible from 9 to 0
    for d in range(9, -1, -1):
        pairs = digit_count[d] // 2
        if d == 0 and not left:
            # Don't add leading zeros unless no other digits exist
            continue
        left.append(str(d) * pairs)
        digit_count[d] -= pairs * 2  # Remove used digits

    # Construct left half as a string
    left_part = ''.join(left)
    # Middle (single) for center: choose the largest digit still remaining
    mid = ''
    for d in range(9, -1, -1):
        if digit_count[d]:
            mid = str(d)
            break

    # Construct right half by reversing left_half (for palindrome)
    right_part = left_part[::-1]

    palindrome = left_part + mid + right_part

    # Edge case: if result is empty, means all zeros, so return "0"
    if not palindrome:
        return "0"
    return palindrome
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `num` (one pass to count digits, then linear work over 10 digits to build each side).
- **Space Complexity:** O(1) extra space since we only use a fixed-size array for counting digits (size 10), plus space for the result string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to use all digits, not some?
  *Hint: You cannot skip any digit and must balance zeros accordingly.*

- Can you return the smallest palindromic number instead?
  *Hint: Build from smallest digit outwards and beware of leading zeros.*

- If the input can have non-digit characters, how would you handle input validation?
  *Hint: Ignore or error on invalid characters.*

### Summary
This uses a **hash/counting plus greedy assembly** coding pattern, combining digit counting with mirroring and placement logic. It's a classic greedy palindrome construction, similar to longest palindrome formation, and is widely applicable anywhere where optimal symmetric structure is desired under digit constraints.


### Flashcard
Count digit frequencies, place largest digits symmetrically using pairs from outside in; handle middle digit separately and avoid leading zeros.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Longest Palindrome(longest-palindrome) (Easy)