### Leetcode 3304 (Easy): Find the K-th Character in String Game I [Practice](https://leetcode.com/problems/find-the-k-th-character-in-string-game-i)

### Description  
You're given a game starting with the string **word** = "a". For each move, every character in **word** is replaced with its next character in the English alphabet (wrap from 'z' to 'a'), and these new characters are appended to the end of **word**. For example, "a" → "ab" (append 'b' after 'a'), next step: "ab" → "abbc" (append 'b', then 'c'). Given integer **k**, find the **k-th** character in the string after enough moves so that the string contains at least **k** characters.

### Examples  

**Example 1:**  
Input: `k = 1`  
Output: `a`  
*Explanation: word starts as 'a'. The 1ˢᵗ character is 'a'.*

**Example 2:**  
Input: `k = 2`  
Output: `b`  
*Explanation:  
After one operation, word = 'ab'. The 2ⁿᵈ character is 'b'.*

**Example 3:**  
Input: `k = 4`  
Output: `c`  
*Explanation:  
Start with 'a' → 'ab' → 'abbc'. Characters: [a,b,b,c]. 4ᵗʰ character is 'c'.*

**Example 4:**  
Input: `k = 7`  
Output: `d`  
*Explanation:  
Evolution:  
- Step 0: "a"
- Step 1: "ab"
- Step 2: "abbc"
- Step 3: "abbcbccd"  
The sequence up to 7 is: [a,b,b,c,b,c,c]. The 7ᵗʰ character is 'd' (from last append in step 3).*

### Thought Process (as if you’re the interviewee)  
First, realize that expanding the entire string for large k is inefficient, since the length doubles at every step.  
For every move, each character is appended with its "next letter" to the word. This creates a structure similar to a binary tree:  
- Left: original, Right: +1 (next letter for each character).

If you represent the process as bits of (k-1), the number of 1's (set bits) in k-1 gives how many times you move right in the binary-like unfolding.  
So, for position k, the answer is chr('a' + (number of set bits in (k-1))) (with mod 26 if wrap needed).  
This is because each rightward branch corresponds to +1 in alphabet.

Final approach:  
- Count number of 1's in binary representation of (k-1).
- The k-th character is the letter: 'a' + count.

This method is optimal (O(log k)) and avoids string construction completely.

### Corner cases to consider  
- k = 1 (only 'a', the minimal case)
- k > 26 (exceeds 'z', needs wrap-around to 'a')
- Very large k (test for performance)
- Confirm 1-based k vs 0-based index

### Solution

```python
class Solution:
    def kthCharacter(self, k: int) -> str:
        # Count how many times "next character" is applied (number of 1's in (k-1))
        count = 0
        n = k - 1
        while n:
            count += n & 1      # Add the least significant bit
            n >>= 1             # Shift right for next bit
        # Wrap around after 'z' (26 letters)
        count %= 26
        return chr(ord('a') + count)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k)  
  Counting 1's in the binary representation of (k-1) is proportional to the number of bits, which is log₂k.
- **Space Complexity:** O(1)  
  Only variables for the count and loop, no extra structures proportional to k.

### Potential follow-up questions (as if you’re the interviewer)  

- If the alphabet was A-Z (uppercase) or used Unicode characters, how would you generalize the method?  
  *Hint: Change the modulo and base character code to match alphabet size and starting character.*

- What if the string started with a different character than 'a'?  
  *Hint: The offset changes -- start from initial character's code instead of 'a'.*

- Can you find the first occurrence index of a given character in the sequence?  
  *Hint: Work backward using the operation rules or construct minimal sequence for that character.*

### Summary
This problem is an example of **bit manipulation** and **logarithmic math**.  
It leverages the pattern where the position in the sequence (in base-2) directly maps to how many "next letter" operations are applied.  
The solution avoids brute-force construction and uses O(1) extra space by counting set bits in (k-1).  
This approach generalizes to similar generative string or tree-based problems where the expansion follows recursive, repetitive rules.