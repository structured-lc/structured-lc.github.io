### Leetcode 2306 (Hard): Naming a Company [Practice](https://leetcode.com/problems/naming-a-company)

### Description  
Given a list of unique strings called `ideas`, you want to build **distinct company names** by picking two different ideas, swapping their first letters, and concatenating them as `"newIdeaA newIdeaB"`. After the swap, the **resulting new words must not already exist** in the original list. The goal: **count the number of valid, distinct company names** you can produce by this rule. Each ordering (A,B and B,A) is considered distinct.

### Examples  

**Example 1:**  
Input: `ideas = ["coffee","donuts","time","toffee"]`  
Output: `6`  
*Explanation:*

- Pair ("coffee", "donuts"): swap first letters ⇒ "doffee", "conuts" (neither in original; valid)
- Pair ("coffee", "time"): swap ⇒ "toffee", "cime" (toffee exists in `ideas`, invalid)
- Pair ("coffee", "toffee"): swap ⇒ "toffee" exists, invalid.
- Pair ("donuts", "time"): swap ⇒ "tonuts","dime" (valid)
- Pair ("donuts", "toffee"): swap ⇒ "tonuts","doffee" (doffee valid, tonuts valid)
- Pair ("time","toffee"): swap ⇒ "toffee" exists, invalid

Final valid ordered pairs:  
("doffee", "conuts"), ("conuts", "doffee"), ("tonuts", "dime"), ("dime", "tonuts"), ("doffee", "tonuts"), ("tonuts", "doffee")  
Total: `6`

**Example 2:**  
Input: `ideas = ["apple","banana","cherry"]`  
Output: `6`  
*Explanation:*  
All pairs will yield swaps whose new words ("bpple", "aanana", etc.) don't exist in `ideas`, so both orderings for each pair are valid. There are 3 ideas: 3 × 2 = 6 possible pairs.

**Example 3:**  
Input: `ideas = ["aaa","baa","caa","bbb","cbc"]`  
Output: `12`  
*Explanation:*  
Pairs whose swapped names both are not in the set, in both orders.

### Thought Process (as if you’re the interviewee)  

- **Brute Force**:
    - Check every pair (ideaA, ideaB), swap the first characters, form new words, and check if both new words don't exist in the input.
    - For n ideas, total pairs: n × (n-1); for each, check swap.
    - Set lookups are fast, but overall O(n²) time, which is too slow for large n.

- **Optimization**:
    - Observe that only the *first letter* affects the swap: the "remaining part" (suffix) after the first letter is crucial.
    - Group all ideas by their suffix: For each suffix, keep a set of starting first letters.
    - For each pair of different first letters (say, 'a', 'b'), count the number of suffixes unique to 'a' and unique to 'b'.
    - For each such suffix, swapping between groups leads to valid new words **only if the new word doesn't already exist.**
    - Efficient counting: For every (i, j) pair of characters ('a'..'z'), the result is 2 × count(i) × count(j), but subtract overlaps (common suffixes between i, j) to avoid reusing existing ideas.

- **Conclusion**: Use a 2D array or list-of-sets structure for fast lookup/grouping, and only consider suffixes without overlap when counting.

### Corner cases to consider  
- Single idea (length 1) – can't form pairs, should return 0.
- All ideas with the same first letter – no swaps would yield new unique words.
- All combinations produce swapped words that exist in ideas – return 0.
- Duplicate suffixes! Multiple starting-letters with identical suffix.
- Maximum input size: stress for time/space.

### Solution

```python
def distinctNames(ideas):
    # Group ideas by their suffix, and for each suffix, keep the set of first characters
    suffix_groups = [set() for _ in range(26)]  # For 'a' to 'z'
    idea_set = set(ideas)
    
    for idea in ideas:
        # Suffix after first letter
        suffix = idea[1:]
        idx = ord(idea[0]) - ord('a')
        suffix_groups[idx].add(suffix)
    
    result = 0
    # For every pair of different first letters
    for i in range(26):
        for j in range(i+1, 26):
            suffix_i = suffix_groups[i]
            suffix_j = suffix_groups[j]
            # Only count suffixes unique to each group
            common = suffix_i & suffix_j
            # Valid swaps: total in i × total in j minus those with overlap
            count_i = len(suffix_i - common)
            count_j = len(suffix_j - common)
            result += count_i * count_j * 2  # Multiply by 2 for (i, j) and (j, i)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26² × k),  
  - Build groups: O(n)
  - For each pair of 26 different first letters, compare sets: O(26² × avg-suffix-compare-cost)
  - Worst-case suffix comparisons if all unique: up to 26² × k, k = avg number per group.  
- **Space Complexity:** O(n),  
  - Each idea is split and stored by suffix in a set. Sets take space proportional to total number of ideas (n). No extra data structures with higher complexity.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual list of valid company names, not just the count?  
  *Hint: Modify to store and output valid pairs, not just count.*

- What changes if duplicate ideas are allowed in input?  
  *Hint: Use multisets or count frequency, adjust set operations for repeated suffixes.*

- How would you handle non-ASCII or unicode starting characters?  
  *Hint: Change fixed 26-limit to a hashmap keyed by any first-letter.*

### Summary
This problem requires recognizing that after a swap, **only the suffix matters**—so it maps well to the "group by first letter, count unique suffixes" pattern. It's a classic hashing and set-grouping interview question, using set operations to efficiently filter out invalid swaps. Similar ideas apply to problems involving word transformation, grouping, and unique combinations (anagrams, word ladders, etc.).