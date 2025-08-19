### Leetcode 2785 (Medium): Sort Vowels in a String [Practice](https://leetcode.com/problems/sort-vowels-in-a-string)

### Description  
Given a string `s`, **sort only the vowels** in the string and keep **all consonants and their positions unchanged**. Vowels include both lowercase and uppercase English characters 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'. The relative order of consonants (and non-vowel characters) must not be disturbed; only the vowels should be sorted within their original positions.

### Examples  

**Example 1:**  
Input: `s = "lEetcOde"`  
Output: `"lEOtcede"`  
*Explanation: The vowels in the string are 'E', 'e', 'O', 'e'. After sorting, these vowels become 'E', 'O', 'e', 'e'. Place them back into the string at their original vowel positions.*

**Example 2:**  
Input: `s = "Leetcode"`  
Output: `"Leotcede"`  
*Explanation: Vowels are 'e', 'e', 'o', 'e'. Sorting them gives 'e', 'e', 'e', 'o'. Replace each vowel in the string by the corresponding sorted vowel.*

**Example 3:**  
Input: `s = "lYmpX"`  
Output: `"lYmpX"`  
*Explanation: There are no vowels in the input, so the output is the same as the input.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that only the vowels need to be sorted, and every other character stays put.  
Brute-force idea:  
- Extract all vowels (along with their positions).
- Sort the vowels.
- Assign sorted vowels back into those positions, reconstructing the final string.

Optimized approaches:  
- Since vowels are limited (10 possible chars), counting sort works faster than general sorting.
- To further save space, do the transformation in-place on a mutable array of the string.
- Either way, the time bottleneck is at most linear for extraction + sorting + reconstruction.

Final approach:  
- Traverse the string, collect vowels (and optionally their indices).
- Sort the vowels (either using counting sort for O(n) or built-in sort for O(k log k) where k = # of vowels).
- Traverse the string again, replacing original vowels (in order) with sorted vowels.

**Trade-offs:**  
- Simple code: just collect and sort vowels.
- Counting sort slightly more code, but faster if a lot of vowels.

### Corner cases to consider  
- Empty string: `""`
- String with no vowels: `"bcdfg"`
- String with all vowels: `"aeiouAEIOU"`
- String with only one vowel: `"abc"`
- String with repeated vowels: `"aaeeii"`
- Mixed uppercase and lowercase vowels: `"AaEeIi"`
- Non-letter characters: `"h3ll0 w0rld!"`

### Solution

```python
def sortVowels(s: str) -> str:
    # Define the set of vowels for quick lookup (both cases)
    vowels_set = {'a', 'e', 'i', 'o', 'u', 
                  'A', 'E', 'I', 'O', 'U'}
    # Step 1: Collect all vowels from the string
    vowels = []
    for c in s:
        if c in vowels_set:
            vowels.append(c)
    # Step 2: Sort the vowels (ASCII order)
    vowels.sort()
    
    # Step 3: Replace each vowel in the string with the sorted ones
    result = []
    vowel_idx = 0
    for c in s:
        if c in vowels_set:
            result.append(vowels[vowel_idx])
            vowel_idx += 1
        else:
            result.append(c)
    # Step 4: Combine the result into a string
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k), where n is the length of the string, and k is the number of vowels.  
    - Collecting vowels: O(n)
    - Sorting vowels: O(k log k)
    - Building the result: O(n)
- **Space Complexity:** O(n + k),  
    - O(k) extra for vowel storage, O(n) additional for result (or the input string if not done in place).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for the number of unique vowels being small?  
  *Hint: Try using counting sort because there are only 10 vowel types (fast and uses less code for small sets).*

- Is your function case-sensitive when sorting?  
  *Hint: Observe if 'A' comes before 'a', and so on. Can you set a custom vowel order?*

- Could you solve this in-place with O(1) extra space if string mutability is allowed?  
  *Hint: Use a mutable array or character list version, and swap vowels in place.*

### Summary  
**Pattern:**  
- This is a classic string reconstruction problem, involving extraction, process, and rebuild.
- The approach is similar to two-pointer or stream-reconstruction patterns, useful in problems asking to reorder or filter subsequence elements in place without disturbing the overall structure.
- Counting sort provides speedup due to limited character alphabet; pattern applies to selective character sorting under constraints.

### Tags
String(#string), Sorting(#sorting)

### Similar Problems
- Reverse Vowels of a String(reverse-vowels-of-a-string) (Easy)