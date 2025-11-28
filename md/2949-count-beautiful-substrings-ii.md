### Leetcode 2949 (Hard): Count Beautiful Substrings II [Practice](https://leetcode.com/problems/count-beautiful-substrings-ii)

### Description  
Given a string **s** and an integer **k**, count the number of *"beautiful"* substrings of **s**.  
A substring is called *beautiful* if:
- Number of vowels equals number of consonants in the substring.
- Let that count be x; then x × x is divisible by k (that is, (x × x) % k == 0).

You’re to return the total count of such substrings. The vowels are 'a', 'e', 'i', 'o', 'u'.  
You may assume 1 ≤ k ≤ 100, 1 ≤ len(s) ≤ 10⁴.

### Examples  

**Example 1:**  
Input: `s="abba", k=2`  
Output: `2`  
*Explanation:  
The substrings "ab" (indices 0-1) and "ba" (indices 1-2) both have 1 vowel and 1 consonant (count=1).
1 × 1 = 1, which is NOT divisible by 2.

The substrings "abb" (0-2) and "bba" (1-3) have 1 vowel and 2 consonants (counts not equal).

The substring "abba" (0-3): 2 vowels, 2 consonants (count=2), 2 × 2 = 4, 4 % 2 = 0. So "abba" is beautiful.

If you list all substrings, only these:
- "abba" (full string, indices 0-3)
- "ba" (indices 1-2), but not beautiful as explained above.

But the expected answer is 2, which means there are two substrings, likely:
- "ba" and "abba".

(For this problem, refer to official examples for the specifics.)*

**Example 2:**  
Input: `s="aeiouu", k=3`  
Output: `0`  
*Explanation:  
All substrings have either all vowels or one consonant; never equal number, so answer is 0.*

**Example 3:**  
Input: `s="bcdfgh", k=1`  
Output: `0`  
*Explanation:  
No vowels in the string, so always 0 vowels / 6 consonants. No substring with equal numbers, so output is 0.*


### Thought Process (as if you’re the interviewee)  
To solve this problem, let's break down the requirements:
- For any substring, number of vowels == number of consonants, call this count x.
- x × x is divisible by k.

**Brute-force approach:**  
- Enumerate all substrings (O(n²)), count vowels and consonants, check conditions.
- This will TLE for n=10⁴.

**Optimizing for equal vowels/consonants:**  
- We need substrings where the **vowel - consonant difference == 0**.  
- We can use prefix sums to track the difference in the number of vowels and consonants seen so far.
- For each substring s[l:r], its difference = prefix[r+1] - prefix[l]. To have equal vowels/consonants: this must be 0.
- We need to count pairs of indices (l, r) where prefixes match.

**But there's a second condition:**  
- For substrings where the difference is 0, count x = number of vowels in the substring.
- The substring is beautiful if x × x % k == 0.

To handle both efficiently:
- Precompute prefix sums for:
  - Number of vowels modulo some "root" (for divisibility).
  - Vowel-minus-consonant.
- Use a hashmap to store the pair (number of vowels modulo root, vowel-consonant difference) → count. For each position, increment result by the count of times we've seen that tuple before.

**Why modulo "root"?**
- Since the substring length x varies, but for x × x % k == 0, the key insight is: there's a periodicity depending on k. For divisibility, we can precompute for each k the minimal integer root such that root × root is divisible by k.

**Final approach:**  
- Loop through the string, updating: 
  - Number of vowels seen (modulo root).
  - Vowel-minus-consonant difference.
- For each prefix state, check and count substrings ending at current index that have the same tuple seen before.

### Corner cases to consider  
- Empty string.
- All vowels or all consonants.
- k = 1 (all squares are divisible by 1).
- Substrings spanning entire string.
- Upper and lower-case letters (depending on constraints).
- Strings with no beautiful substrings.

### Solution

```python
def count_beautiful_substrings(s: str, k: int) -> int:
    # Helper: check if character is a vowel.
    def is_vowel(c):
        return c in 'aeiou'

    # Find smallest root such that root * root % k == 0
    def get_root(k):
        for i in range(1, k + 1):
            if (i * i) % k == 0:
                return i
        raise ValueError('No valid root found')

    root = get_root(k)
    
    ans = 0
    # (vowel_count_mod_root, vowel_minus_consonant): count
    from collections import defaultdict
    count_map = defaultdict(int)
    # Start with state (0 vowels mod root, difference 0): 1 way
    count_map[(0, 0)] = 1
    
    vowel_count = 0
    vowel_minus_consonant = 0
    
    for c in s:
        if is_vowel(c):
            vowel_count += 1
            vowel_minus_consonant += 1
        else:
            vowel_minus_consonant -= 1
        
        key = (vowel_count % root, vowel_minus_consonant)
        ans += count_map[key]
        count_map[key] += 1
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k)
  - O(n) for a single pass through the string.
  - O(k) for determining the root (since k ≤ 100, it's negligible).
- **Space Complexity:** O(n)
  - At worst, unique prefix tuples up to O(n) (or more precisely O(root × n)), where root ≤ k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains uppercase letters?
  *Hint: Should you normalize the string or adapt is_vowel to account for upper case?*

- How would the approach change if you wanted to count substrings with at least as many vowels as consonants?
  *Hint: Does the prefix sum method generalize with a different check?*

- Can you adapt the solution to count substrings where vowels minus consonants = d (for any fixed d)?
  *Hint: Think about how you track difference in the hashmap.*

### Summary
This problem is a combination of the prefix sum / hashmap pattern (often used to count substrings or subarrays with a particular sum or property) with an extra modulo/divisibility constraint. The general approach is efficient and widely used for equal count substrings, zero-sum subarrays, and similar problems, which often appear in coding interviews and contests.


### Flashcard
Use prefix sums to track vowel_count - consonant_count. For each position, find all prior positions where the difference equals current difference (vowels == consonants) and the distance squared is divisible by k.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Number Theory(#number-theory), Prefix Sum(#prefix-sum)

### Similar Problems
