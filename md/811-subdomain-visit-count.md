### Leetcode 811 (Medium): Subdomain Visit Count [Practice](https://leetcode.com/problems/subdomain-visit-count)

### Description  
Given a list of strings representing domain visit counts (e.g. `"9001 discuss.leetcode.com"`), return the **total visit count** for each subdomain.  
Each input string has two parts: an integer count and a domain name. Every visit to a domain means an *implicit* visit to all its parent domains.  
For example, `"discuss.leetcode.com"` means there was also a visit to `"leetcode.com"` and to `"com"`.  
You must return a list of strings in the format `"{count} {subdomain}"` for each unique subdomain, in any order.

### Examples  

**Example 1:**  
Input: `["9001 discuss.leetcode.com"]`  
Output: `["9001 com","9001 leetcode.com","9001 discuss.leetcode.com"]`  
*Explanation:*
- `"discuss.leetcode.com"` visited 9001 times.  
- Each subdomain (`"com"`, `"leetcode.com"`, `"discuss.leetcode.com"`) gets 9001 visits.

**Example 2:**  
Input: `["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]`  
Output: `["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]`  
*Explanation:*
- `"google.mail.com"` → `"google.mail.com"`, `"mail.com"`, `"com"` get 900 visits each.
- `"yahoo.com"` → `"yahoo.com"`, `"com"` get 50 more.
- `"intel.mail.com"` → `"intel.mail.com"`, `"mail.com"`, `"com"` get 1 more.
- `"wiki.org"` → `"wiki.org"`, `"org"` get 5 more.
- Final tallies:
  - `"com"`: 900+50+1=951
  - `"mail.com"`: 900+1=901
  - etc.

**Example 3:**  
Input: `["1 a.b.c.d.com"]`  
Output: `["1 com","1 d.com","1 c.d.com","1 b.c.d.com","1 a.b.c.d.com"]`  
*Explanation:*  
All subdomains from deepest to the top-level receive 1 visit.

### Thought Process (as if you’re the interviewee)  
First idea:  
- For each count-domain string, split it into the count and the full domain.  
- For the domain, generate all possible subdomains (by splitting on `"."`).  
- For each subdomain, add the visit count to a dictionary that tracks total visits.

Optimizing:  
- Instead of nested loops, use string manipulation to walk from the most specific subdomain up to the top-level domain.
- Use a single map (dict) to accumulate counts for each subdomain as we process input.

This approach is simple and efficient given constraints. All operations are straightforward, and string splits and dict lookups are fast and scalable.

### Corner cases to consider  
- Empty input list.
- Domains with a single segment (e.g. `"1 com"`).
- Repeated domains (should sum up counts).
- Domains with four or more levels.
- Extra spaces, if input is not well formatted (won't happen per problem statement).

### Solution

```python
def subdomainVisits(cpdomains):
    # Dictionary to keep count of visits for each subdomain
    subdomain_counts = {}
    
    for entry in cpdomains:
        # Separate count and domain
        count_str, domain = entry.split(' ')
        count = int(count_str)
        # Split domain into its subdomain parts
        frags = domain.split('.')
        # Step through possible subdomains from right to left
        for i in range(len(frags)):
            subdomain = '.'.join(frags[i:])
            if subdomain not in subdomain_counts:
                subdomain_counts[subdomain] = 0
            subdomain_counts[subdomain] += count
    
    # Format the result list as specified
    result = [f"{v} {k}" for k, v in subdomain_counts.items()]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L)  
  - N = number of input strings, L = average number of fragments in a domain.
  - For each input string, we may generate up to L subdomains and perform map insertions.

- **Space Complexity:** O(M)  
  - M = number of unique subdomains, which at most is N × L (if all subdomains are different).
  - Extra storage is for the dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle input with invalid formats?
  *Hint: Add error-checking and defensive parsing.*
- What if there are millions of visits and memory is tight?
  *Hint: Consider approaches like streaming, external files, or probabilistic counting.*
- Can you handle queries like "what is the top K most visited subdomains?"
  *Hint: Use a heap to track the top K as you populate the counts.*

### Summary
This problem is a classic example of **hashmap accumulation** with string decomposition for hierarchical structures.  
Common patterns:
- Breaking a hierarchical identifier into all ancestor paths (files, DNS, folder paths).
- Used in log processing, file system analytics, and hierarchical counters.
No tricky data structures; just systematic string handling and aggregation using dictionaries.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
