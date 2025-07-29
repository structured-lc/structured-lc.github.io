### Leetcode 345 (Easy): Reverse Vowels of a String [Practice](https://leetcode.com/problems/reverse-vowels-of-a-string)

### Description  
Given a string, reverse only the **vowels** (a, e, i, o, u, both cases) in that string. The order of the other characters should remain unchanged. For example, in `"hello"`, you would reverse the vowels 'e' and 'o', resulting in `"holle"`. The challenge is to do this efficiently, ideally in-place with minimal extra space.

### Examples  

**Example 1:**  
Input: `s = "hello"`  
Output: `holle`  
*Explanation: The vowels are 'e' and 'o'. Reversing them gives 'o' at index 1 and 'e' at index 4, so output is "holle".*

**Example 2:**  
Input: `s = "leetcode"`  
Output: `leotcede`  
*Explanation: The vowels are 'e', 'e', 'o', 'e' at positions 1,2,4,6. Reversing order: 'e','o','e','e' → so indices 1,2,4,6 become 'e','o','e','e' and result is "leotcede".*

**Example 3:**  
Input: `s = "aA"`  
Output: `Aa`  
*Explanation: The vowels are 'a' and 'A'. After reversing, 'A' is at index 0 and 'a' at 1, so output is "Aa".*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  One straightforward approach is:
  - Traverse the string, collect all vowels and their indices.
  - Reverse the list of vowels.
  - Replace the vowels in their original positions with the reversed list.
  - However, this uses extra O(n) space to store vowel positions and values.
  
- **Optimized (Two Pointers):**  
  - Use two pointers: one (`left`) starts from the start, and another (`right`) from the end.
  - Move `left` rightward until a vowel is found; move `right` leftward until a vowel is found.
  - Swap the vowels at `left` and `right`, then move both pointers inward.
  - Continue until `left` >= `right`.
  - This process efficiently reverses only the vowels in a single in-place pass.
  - Since strings are immutable in Python, first convert input string to a list for in-place swaps, and rejoin at the end[1][2][3].
  
- **Why choose two pointers?**  
  - Allows in-place reversal of vowels in O(1) extra space (aside from the working list).
  - Only O(n) time as each character is checked at most once.
  - Clean and simple to code; avoids extra arrays.

### Corner cases to consider  
- Empty string: `""`
- String with no vowels: `"bcdfg"`
- String with all vowels: `"aeiouAEIOU"`
- Vowel at start/end: `"apple"`, `"end"`
- Mixed case vowels: `"aA"`
- Single character strings: `"a"`, `"z"`
- Punctuation and spaces included: `"h!e,l;lo"`

### Solution

```python
def reverseVowels(s: str) -> str:
    # Set of vowels (both lower and upper case)
    vowels = set('aeiouAEIOU')
    # Convert string to list for in-place swapping
    s_list = list(s)
    # Initialize two pointers
    left, right = 0, len(s_list) - 1

    while left < right:
        # Move left pointer forward to next vowel
        while left < right and s_list[left] not in vowels:
            left += 1
        # Move right pointer backward to next vowel
        while left < right and s_list[right] not in vowels:
            right -= 1

        # Swap the vowels at left and right indices
        if left < right:
            s_list[left], s_list[right] = s_list[right], s_list[left]
            left += 1
            right -= 1

    # Convert list back to string and return
    return ''.join(s_list)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n = length of input string.  
  Each character is visited at most once by either pointer.

- **Space Complexity:**  
  O(n), for converting string to list (required since strings are immutable in Python). No extra space for storing vowels or indices; only pointers and a set of size 10 for vowels.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the input was guaranteed to only contain lowercase English letters?  
  *Hint: With only lowercase, the vowel check can be slightly optimized to a smaller set.*

- What would change if you had to reverse only consonants instead?  
  *Hint: The approach is similar; just swap the vowel check for a consonant check (non-vowel, alphabetic characters).*

- Can you do this in-place if the input is a character array instead of a string?  
  *Hint: If input is mutable (array), just apply the same two-pointer technique directly.*

### Summary
This is a classic **two pointers** string problem: both pointers scan towards the center, swapping target characters (here, vowels). It’s efficient and requires very little extra space. This technique is widely useful in reversals (e.g., reverse words, reverse subarrays, partitioning, etc.). The key pattern: "reverse subset in place with two pointers."