### Leetcode 929 (Easy): Unique Email Addresses [Practice](https://leetcode.com/problems/unique-email-addresses)

### Description  
We're given a list of email addresses. Each address consists of a **local name** and a **domain name** separated by `'@'`.  
- In the **local name** (before `'@'`):  
  - Ignore all periods `.`  
  - Ignore everything after a plus sign `+` (including the plus)  
- The **domain name** (after `'@'`) is left untouched  
We have to **count how many unique normalized email addresses** appear in the list after applying these rules.

### Examples  

**Example 1:**  
Input: `["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]`  
Output: `2`  
*Explanation:  
- "test.email+alex@leetcode.com" → "testemail@leetcode.com"  
- "test.e.mail+bob.cathy@leetcode.com" → "testemail@leetcode.com"  
- "testemail+david@lee.tcode.com" → "testemail@lee.tcode.com"  
That’s 2 unique addresses: "testemail@leetcode.com", "testemail@lee.tcode.com"*

**Example 2:**  
Input: `["a@leetcode.com","b@leetcode.com","c@leetcode.com"]`  
Output: `3`  
*Explanation:  
No dots or pluses to process, so all emails remain as-is and unique.*

**Example 3:**  
Input: `["test.email+alex@leetcode.com","test.email.leet+alex@code.com"]`  
Output: `2`  
*Explanation:  
First → "testemail@leetcode.com"  
Second → "testemailleet@code.com"  
Both are unique.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify:
- Only process dots and pluses in the **local name**
- The **domain name** is unchanged

Brute-force idea:
- For each email, split at `'@'`.
- Clean the local name:
  - Remove all dots
  - If there’s a `+`, ignore everything after it
- Combine the cleaned local name with the original domain
- Use a **set** to keep only unique normalized emails

This is efficient because:
- Every character is visited at most once per email
- Using a set gives O(1) average lookup and insert

I’d avoid using regular expressions for maintainability and clarity.

### Corner cases to consider  
- Email with multiple '+' or '.' in local name
- Email with a '+' at the start of local name, or only dots in local
- Emails with nothing after the '+'  
- All emails are already unique
- All emails become the same after normalization

### Solution

```python
def numUniqueEmails(emails):
    unique_emails = set()
    for email in emails:
        local, domain = email.split('@')
        cleaned_local = []
        for c in local:
            if c == '+':
                break  # Ignore rest after '+'
            if c == '.':
                continue  # Ignore '.'
            cleaned_local.append(c)
        normalized = ''.join(cleaned_local) + '@' + domain
        unique_emails.add(normalized)
    return len(unique_emails)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × M)  
  N = number of emails, M = maximum length of an email. For each character in each email we may process it once.

- **Space Complexity:** O(N × M)  
  Because in the worst case all emails are unique after normalization; needing space for every normalized result in the set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the local name rules changed (e.g., dots weren't ignored)?  
  *Hint: Discuss modularity—have helper functions for parsing; just adjust those rules.*

- What if email addresses were case insensitive?  
  *Hint: Think about using `.lower()` before adding to the set.*

- Can you process the emails in parallel for large inputs?  
  *Hint: Emails are independent; parallelize processing for each before set insertion.*

### Summary
This problem is classic **string normalization** with a **hash set** for uniqueness.  
Pattern used here is **data cleaning and de-duplication**—applicable for text processing, log clean-up, and pre-processing for database storage of standardized records.


### Flashcard
Normalize each email by removing dots and ignoring everything after '+' in the local name, then combine with the domain and use a set to count unique results.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
