### Leetcode 3059 (Easy): Find All Unique Email Domains [Practice](https://leetcode.com/problems/find-all-unique-email-domains)

### Description  
Given a table of email addresses, your task is to **identify all unique email domains** and count how many emails are associated with each domain—*but only* count domains that end with ".com".  
Return a list of (domain, count) pairs, sorted by domain name.

### Examples  

**Example 1:**  
Input:  
Emails =  
```
[
 ("336", "hwkiy@test.edu"),
 ("489", "adcmaf@outlook.com"),
 ("449", "vrzmwyum@yahoo.com"),
 ("95",  "tof@test.edu"),
 ("320", "jxhbagkpm@example.org"),
 ("411", "zxcf@outlook.com")
]
```  
Output:  
```
[
 ("outlook.com", 2),
 ("yahoo.com", 1)
]
```  
Explanation:  
Only domains ending with ".com" are "outlook.com" (appears 2 times) and "yahoo.com" (appears 1 time). Other domains like "test.edu" or "example.org" are ignored.

**Example 2:**  
Input:  
Emails =  
```
[
 ("1", "alice@gmail.com"),
 ("2", "bob@gmail.com"),
 ("3", "alice@yahoo.com"),
 ("4", "bob@yahoo.com"),
 ("5", "carol@hotmail.com"),
 ("6", "dave@outlook.com")
]
```  
Output:  
```
[
 ("gmail.com", 2),
 ("hotmail.com", 1),
 ("outlook.com", 1),
 ("yahoo.com", 2)
]
```  
Explanation:  
All emails use ".com" domains. Each domain is counted and lex sorted (gmail.com, hotmail.com, outlook.com, yahoo.com).

**Example 3:**  
Input:  
Emails =  
```
[
 ("123", "foo@abc.com"),
 ("124", "bar@xyz.org"),
 ("125", "baz@abc.com")
]
```  
Output:  
```
[
 ("abc.com", 2)
]
```  
Explanation:  
Only "abc.com" is a ".com" domain and appears twice.

### Thought Process (as if you’re the interviewee)  
- The **brute-force** approach is to iterate over each email, extract its domain (substring after '@'), check if it ends with ".com", and count occurrences for each domain using a hashmap (dictionary).
- At the end, output all domains with their counts, sorted lexicographically.
- This is efficient because extracting domains and checking suffix is a simple string operation; using a hashmap ensures counting is fast.
- The core *trade-off* is using extra space (the hashmap), but it's required to keep track of the counts.
- There’s no need for further optimization since each email is processed exactly once and sorting is acceptable.

### Corner cases to consider  
- **No emails:** Should return an empty list.
- **No ".com" domains:** Ignore domains not ending with ".com", possibly return an empty list.
- **Emails with upper/lowercase letters:** Should treat domain comparison as case-sensitive (unless specified).
- **Duplicate emails:** Each occurrence is counted.
- **Emails with malformed structure (no '@'):** Assume inputs are valid (for this LeetCode SQL problem).
- **Domains with subdomains:** E.g., "john@mail.google.com" → domain is "mail.google.com", still counts if ends '.com'.

### Solution

```python
def find_unique_email_domains(emails):
    # emails: list of tuples (id, email_address)
    domain_counts = {}
    
    # Process each email in the input list
    for _, address in emails:
        # Find the domain part after '@'
        at_index = address.find('@')
        if at_index == -1:
            continue  # skip malformed emails
        
        domain = address[at_index + 1:]
        
        # Only process domains ending with ".com"
        if domain.endswith('.com'):
            if domain in domain_counts:
                domain_counts[domain] += 1
            else:
                domain_counts[domain] = 1
    
    # Prepare final sorted output: list of (domain, count) tuples
    result = sorted(domain_counts.items())
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k + d log d)  
  Where n = number of emails, k = max domain length, d = number of unique ".com" domains.  
  Explanation: O(n × k) to process and extract domain from each email; O(d log d) to sort domains.
- **Space Complexity:** O(d)  
  Where d is the number of unique ".com" domains. The hashmap stores counts per domain.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle case-insensitive domains (e.g., "abc.COM" vs "ABC.com")?  
  *Hint: Normalize domains to lower-case before processing.*

- What if emails have multiple '@' symbols?  
  *Hint: Only consider the substring after the last '@' as the domain.*

- If you had to process very large data (millions of emails), how could you scale or optimize?  
  *Hint: Consider external sorting, streaming solutions, or using databases with GROUP BY queries.*

### Summary
This approach uses the classic **hashmap counting** pattern: extract keys (email domains), filter by a condition (endswith '.com'), and aggregate counts.  
Sorting the results gives ordered output by domain name.  
Such string parsing and counting is common in log analysis, user grouping, or basic report generation tasks.  
This pattern also aligns well with SQL GROUP BY queries or MapReduce problems in distributed systems.

### Tags
Database(#database)

### Similar Problems
