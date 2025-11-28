### Leetcode 3035 (Medium): Maximum Palindromes After Operations [Practice](https://leetcode.com/problems/maximum-palindromes-after-operations)

### Description  
Given an array of strings, you can swap any two characters from any positions in any words as many times as you want.  
Your task: **maximize how many strings become palindromes** after such operations. Return that maximum count.

A palindrome is a string that reads the same forwards and backwards (e.g., "aba", "bbb").  
Any rearrangement is allowed, as long as the final words can be made palindromic.

### Examples  

**Example 1:**  
Input: `words = ["ab", "ba", "cc"]`  
Output: `2`  
Explanation:  
After swaps, you can rearrange to get ["aa", "bc", "cb"]. Only "aa" and "cc" can be palindromes (since "bc" and "cb" can’t). Maximum is 2.

**Example 2:**  
Input: `words = ["aa", "bc", "cb"]`  
Output: `1`  
Explanation:  
After swaps, best you can do is ["aa", "bb", "cc"], but only one string can have both same characters ("aa", "bb", or "cc" -- the rest will not be palindromes).

**Example 3:**  
Input: `words = ["a", "bb", "aba"]`  
Output: `3`  
Explanation:  
All words can already be palindromes ("a", "bb", "aba"). Maximum is 3.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
Try all possible swaps — check all possible permutations and see how many palindromes can be formed. But it's not feasible: number of rearrangements is huge.

- **Key insight:**  
Since any swaps are allowed, **only the total letter counts matter**. You can always form any arrangement if you have the right multiset of letters.

- To make a string of length `L` a palindrome:
    - If `L` is even: all letters in it must be paired (even counts).
    - If `L` is odd: all but one letter must be paired (one allowed unpaired).

- If you combine all characters into one pool, can you distribute them so that the most number of words become palindromes?

- **Optimized approach:**  
    1. **Count the frequency of all letters** in all words.
    2. **Sort words by their length**.
    3. For each word (shortest first), try to "give" it the chars needed to form a palindrome:
        - Use up pairs from your pool to match the word's length.
        - If word’s length is odd, reserve one unpaired letter for its center.
    4. Stop when unable to satisfy the next word with the remaining pairs/unpaired letters.

- This approach is greedy: by handling shorter words first, you maximize the distribution of available pairs.

### Corner cases to consider  
- Empty array (`words = []`)
- All single-letter words
- Words with only one character type (e.g., ["aaa", "aaa"])
- Words of mixed odd/even length
- Not enough characters to fill all words
- Multiple words with the same length

### Solution

```python
def maxPalindromesAfterOperations(words):
    # Count total frequency of each character in all words
    from collections import Counter
    total_freq = Counter()
    for w in words:
        total_freq.update(w)
    
    # Count total pairs available (two chars same = 1 pair)
    pairs = 0
    for c in total_freq:
        pairs += total_freq[c] // 2

    # Record each word's length
    word_lengths = sorted([len(w) for w in words])

    ans = 0        # Number of palindromes formed
    unpaired = sum(v % 2 for v in total_freq.values())  # Total unpaired chars.
    
    idx = 0
    for length in word_lengths:
        need_pairs = length // 2     # Need these many pairs to construct a palindrome
        if pairs < need_pairs:
            break
        pairs -= need_pairs
        ans += 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N + M) for counting all characters, where N is number of words and M total characters,  
  O(N log N) for sorting lengths.  
  So overall: O(N log N + M).

- **Space Complexity:**  
  O(1), since only 26 character frequencies and `O(N)` for the list of word lengths.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you can swap only within the same word?  
  *Hint: Letters can't be shared, so just check each word individually.*

- Instead of returning max number, can you tell exactly which words can be palindromes after optimal swaps?  
  *Hint: Assign as you go when consuming the pairs; track indices.*

- How would you solve if allowed at most K swaps?  
  *Hint: Now you can't arbitrarily rearrange, so you may need to simulate greedily or use DP to track swaps.*

### Summary

This problem is an application of the **greedy algorithm pattern** combined with counting and sorting.  
The insight is that, with unlimited global swaps, all that matters is total letter pairing, and distributing pairs optimally (smallest words first) maximizes palindromes.  
This pattern often appears in problems where global rearrangement is allowed and only counts matter, not original structure.


### Flashcard
Only letter counts matter (any arrangement possible); greedily form palindromes of decreasing length using paired letters.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Greedy(#greedy), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Valid Palindrome(valid-palindrome) (Easy)