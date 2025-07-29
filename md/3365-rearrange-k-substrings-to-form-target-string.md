### Leetcode 3365 (Medium): Rearrange K Substrings to Form Target String [Practice](https://leetcode.com/problems/rearrange-k-substrings-to-form-target-string)

### Description  
Given two strings **s** and **t** (both the same length, and guaranteed to be anagrams), and an integer **k**, determine if you can split **s** into **k** equal-length contiguous substrings, rearrange them in any order, and concatenate them to form **t**.  
Each substring must be contiguous and of equal length.  
Return **True** if it's possible to rearrange the **k** substrings of **s** to get **t**, otherwise return **False**.

### Examples  

**Example 1:**  
Input: `s = "abcdabcd", t = "cdabdcab", k = 4`  
Output: `True`  
Explanation:  
Split `s` into substrings of length 2: ["ab", "cd", "ab", "cd"].  
Split `t` into substrings of length 2: ["cd", "ab", "dc", "ab"].  
Both can be rearranged to match exactly by reordering the 2-length substrings.

**Example 2:**  
Input: `s = "abab", t = "baba", k = 2`  
Output: `True`  
Explanation:  
Split `s` into substrings of length 2: ["ab", "ab"].  
Split `t` into substrings of length 2: ["ba", "ba"].  
Cannot rearrange the substrings of `s` to match `t` since "ab" ≠ "ba".

**Example 3:**  
Input: `s = "aabbcc", t = "ccbbaa", k = 3`  
Output: `True`  
Explanation:  
Split `s` into substrings of length 2: ["aa", "bb", "cc"].  
Split `t` into substrings of length 2: ["cc", "bb", "aa"].  
The substrings are the same in any order: {"aa", "bb", "cc"}.

### Thought Process (as if you’re the interviewee)  

- **Brute Force approach:**  
    Consider all possible permutations of the **k** substrings of **s**, check if any permutation concatenates to form **t**.  
    This is inefficient since there are k! permutations.

- **Optimization:**  
    Observe that since the splits are fixed (contiguous, equal-sized substrings), the only thing that matters is the set (with multiplicities) of substrings you get from **s** and from **t** after splitting.  
    If both multisets (counts of each unique substring) match, it's possible; otherwise, it's not.

- **Implementation:**  
    1. Compute the length of each substring: **m = n // k**.
    2. Split both **s** and **t** into k substrings of length **m**.
    3. Count occurrences of each unique substring for both **s** and **t** (use hash map/counter).
    4. Compare the two counters; return True if same, else False.

- **Trade-offs:**  
    - This avoids the factorial complexity of brute force.
    - Simple O(n) time and space using hashmaps.

### Corner cases to consider  
- k does not divide len(s): strings cannot be split into equal substrings (guaranteed valid in the problem, but good to check).
- All substrings are identical.
- All substrings are unique.
- k = 1: full string must match.
- k = n: every substring is a single character.
- s and t are already equal.

### Solution

```python
def isPossibleToRearrange(s: str, t: str, k: int) -> bool:
    # Length of each substring after splitting
    n = len(s)
    if n % k != 0:
        return False  # Cannot split equally (defensive, may not be needed if constraints guarantee)

    m = n // k

    # Build count of substrings for s and t
    from collections import Counter

    subs_s = [s[i:i + m] for i in range(0, n, m)]
    subs_t = [t[i:i + m] for i in range(0, n, m)]

    return Counter(subs_s) == Counter(subs_t)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Splitting strings and building counters both require linear traversal of length n.

- **Space Complexity:** O(n) in the worst case, if all substrings are unique and stored in the Counter.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s and t are not guaranteed to be anagrams?  
  *Hint: Check character counts as a pre-check before checking substrings.*

- How would you handle extremely large strings where k is very large?  
  *Hint: Optimize substring storage—avoid materializing all substrings if possible.*

- Suppose you may choose how to divide s into k contiguous substrings (unequal-sized allowed): can you still solve the problem?  
  *Hint: Now you need to check all possible ways to partition s! This increases complexity a lot.*

### Summary
This problem is a classic case of **hashing and multiset comparison**: preprocess input into grouped units (substrings), count frequency, and compare.  
The coding pattern is the frequent "split → count → compare", commonly seen in anagram/grouping/subarray problems. Similar logic applies in "Group Anagrams" or "Check If Two Words Are k-Anagrams". Substring hashing and brute force partitioning are generalizations for harder variations.