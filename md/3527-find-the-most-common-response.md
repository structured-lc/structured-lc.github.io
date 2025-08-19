### Leetcode 3527 (Medium): Find the Most Common Response [Practice](https://leetcode.com/problems/find-the-most-common-response)

### Description  
Given a 2D list of strings `responses`, where each `responses[i]` is a list of survey responses for day i, find the **most common** response across all days **after removing duplicate responses within each day**. If there is a tie in frequency, return the **lexicographically smallest** response. 

Your task:
- Eliminate duplicates in each day's responses so each unique response per day is counted at most once for that day.
- Count how many (deduped) days each response appears on.
- Return the response with the highest count (or the lexicographically smallest in case of a tie).

### Examples  

**Example 1:**  
Input: `responses = [["good","ok","good","ok"],["ok","bad","good","ok","ok"],["good"],["bad"]]`  
Output: `"good"`  
*Explanation: Remove duplicates per day: `[["good", "ok"], ["ok", "bad", "good"], ["good"], ["bad"]]`.  
"good" appears on 3 days, "ok" on 2 days, "bad" on 2 days.  
"good" is most common.*

**Example 2:**  
Input: `responses = [["good","ok","good"],["ok","bad"],["bad","notsure"],["great","good"]]`  
Output: `"bad"`  
*Explanation: Deduplication: `[["good", "ok"], ["ok", "bad"], ["bad", "notsure"], ["great", "good"]]`.  
"bad", "ok", "good" all appear 2 times, "notsure" and "great" 1 time.  
Pick lex smallest: "bad".*

**Example 3:**  
Input: `responses = [["banana"], ["apple", "banana", "apple"], ["banana", "peach", "apple"]]`  
Output: `"banana"`  
*Explanation: Deduplication: `[["banana"], ["apple", "banana"], ["banana", "peach", "apple"]]`.  
"banana" on 3 days, "apple" on 2 days, "peach" 1 time.  
Return "banana".*


### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** For each response, count its total occurrences across all responses, but with duplicates per day, counts will be inflated.
- **Key observation:** Only unique entries per day should be counted, so convert each day's response list to a set.
- **Optimized approach:**  
    - For every day's responses, use a set to deduplicate.
    - Use a hash map (dictionary) to count for each response how many days it appears on.
    - After counting, iterate over the hash map to find the max count; in case of a tie, pick the lexicographically smallest string.
- **Final approach:** Use sets per day and a dictionary for overall counting. This is efficient and respects the requirements.

Trade-offs: This uses extra space for sets and the dictionary but is necessary given the constraints.

### Corner cases to consider  
- **All days have the same response**
- **Multiple responses tie for max frequency**
- **Each day's responses are all duplicates**
- **Empty response lists** (though per constraints, all lists have at least one string)
- **One day, one response**
- **Very long identical responses** (stress test lexicographical ordering)

### Solution

```python
def findMostCommonResponse(responses):
    # Step 1: Count the frequency of each unique response per day
    freq = {}  # Dictionary to store response counts
    
    for day in responses:
        day_unique = set(day)  # Remove duplicates per day
        for resp in day_unique:
            if resp in freq:
                freq[resp] += 1
            else:
                freq[resp] = 1
    
    # Step 2: Find response(s) with maximum frequency
    max_count = 0
    max_responses = []
    for resp, count in freq.items():
        if count > max_count:
            max_count = count
            max_responses = [resp]
        elif count == max_count:
            max_responses.append(resp)
    
    # Step 3: Return the lexicographically smallest response
    return min(max_responses)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(totalResponses)  
  Each element is visited once (converting each day's list to a set, traversing all responses, and then one dictionary traversal), so total work is linear in the number of input strings, i.e., O(Σ│responses[i]│).
- **Space Complexity:** O(totalUniqueResponses)  
  We use a dictionary for unique strings and possibly a set per day. At most, unique string space and per-day temp set space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to return all responses with the maximal frequency (not just the smallest one)?  
  *Hint: Instead of min(), return the whole max_responses list sorted.*

- How would you optimize if the input list is too big to fit into memory?  
  *Hint: Use external or streaming techniques, and consider processing per day and updating counts without storing all data.*

- What if the responses could be very long strings or contain unicode/uppercase letters?  
  *Hint: Carefully handle string comparison (normalization, locale-aware sort), and use a trie if needing prefix queries.*

### Summary
This approach is based on the **Frequency Hash Map** / Counting pattern, with a twist to deduplicate using set per group before counting. Variants of this appear in survey/statistics data analysis and can be applied wherever groupwise-deduplication and counting is needed, such as "number of users performing an action per day", "most common tag across articles (deduplicated per article)" etc. The core idea is to use a hash map and efficient set operations per subgroup.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Majority Element(majority-element) (Easy)