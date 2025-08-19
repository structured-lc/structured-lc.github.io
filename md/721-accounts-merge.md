### Leetcode 721 (Medium): Accounts Merge [Practice](https://leetcode.com/problems/accounts-merge)

### Description  
Given a list of accounts, where each account is a list with the user's name as the first element and the rest are that user's email addresses, merge accounts belonging to the same person. Two accounts belong to the same person **if at least one email address is shared**. Same names alone do **not** guarantee merging—only shared emails connect accounts. Return the merged accounts, each as a list with the name followed by a sorted list of unique emails. The account order in the output does not matter, but emails within each account must be sorted.

### Examples  

**Example 1:**  
Input:  
`[["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["John", "johnsmith@mail.com", "john00@mail.com"], ["Mary", "mary@mail.com"], ["John", "johnnybravo@mail.com"]]`  
Output:  
`[["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"], ["Mary", "mary@mail.com"], ["John", "johnnybravo@mail.com"]]`  
*Explanation*:  
- The first and second 'John' accounts are merged because they share 'johnsmith@mail.com'.  
- 'Mary' has no overlap with others.  
- The third 'John' has only 'johnnybravo@mail.com' and is separate.

**Example 2:**  
Input:  
`[["Alex", "alex0@mail.com", "alex1@mail.com"], ["Alex", "alex1@mail.com", "alex2@mail.com"], ["Alex", "alex2@mail.com", "alex3@mail.com"]]`  
Output:  
`[["Alex", "alex0@mail.com", "alex1@mail.com", "alex2@mail.com", "alex3@mail.com"]]`  
*Explanation*:  
- All Alex accounts are merged into one, because each shares a link (alex1 ⟷ alex2, etc.).

**Example 3:**  
Input:  
`[["Bob", "bob@mail.com"], ["Bob", "bob2@mail.com"], ["Bob", "bob@mail.com", "bob2@mail.com"]]`  
Output:  
`[["Bob", "bob@mail.com", "bob2@mail.com"]]`  
*Explanation*:  
- Although initially three accounts, all are merged because 'bob@mail.com' and 'bob2@mail.com' connect all accounts.

### Thought Process (as if you’re the interviewee)

- **Brute-force**:  
  Compare every account pair to see if they share any emails, merge if connected. Repeat until no more merges. This approach is **too slow (O(n²m), n=accounts, m=emails per account)** because of repeated checks and inefficient merging.

- **Optimized Approach**:
  - Model the accounts as a **graph** where:
    - Each unique email is a node.
    - An edge connects two emails if they are in the same account.
  - Use **DFS or Union-Find** to find connected components (i.e., groups of emails linked through shared accounts).
  - For each group:
    - Collect all emails, get the associated name (from any email in the group), sort emails, and put the result into output.

- **Why use this approach**:
  - Finds all mergeable accounts in **linear time relative to the number of emails and connections**.
  - Avoids redundant work and is easy to implement with clear data structures (adjacency list, visited set).

### Corner cases to consider  
- No accounts (`[]`)  
- All accounts belong to different people (no common emails)  
- All accounts belong to the same person (all emails somehow connected)  
- Some accounts have only one email  
- Same name, but not the same person (different, non-overlapping emails)  
- Duplicate emails within a single account  
- Emails with different cases (should be normalized if case-insensitive)

### Solution

```python
def accountsMerge(accounts):
    # Step 1: Build maps and email graph
    email_to_name = {}
    email_graph = {}
    
    for account in accounts:
        name = account[0]
        emails = account[1:]
        for email in emails:
            email_to_name[email] = name
            if email not in email_graph:
                email_graph[email] = []
        # Connect first email with all others in this account
        for email in emails[1:]:
            email_graph[emails[0]].append(email)
            email_graph[email].append(emails[0])
    
    # Step 2: DFS for each component to collect emails
    visited = set()
    result = []
    
    def dfs(email, component):
        component.append(email)
        visited.add(email)
        for neighbor in email_graph[email]:
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for email in email_to_name:
        if email not in visited:
            component = []
            dfs(email, component)
            result.append([email_to_name[email]] + sorted(component))
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N × K × α(N)), where N = number of accounts and K = average number of emails per account.  
  - Building the graph and traversing all emails are linear in total number of emails and connections.
  - Sorting per merged account is O(M log M), where M is the number of emails in that group.

- **Space Complexity:**  
  O(N × K) for storing email graph, name mapping, and visited set. Final result also stores all emails grouped by user.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large datasets (hundreds of millions of accounts)?  
  *Hint: Can you do it distributed or stream-based?*

- Suppose email addresses may differ only in case (e.g. 'A@a.com' vs 'a@a.com'). How do you handle this?  
  *Hint: Normalize input before building the graph.*

- Can you efficiently support addition and removal of emails or accounts over time?  
  *Hint: Consider dynamic graph/union-find data structures or a database-backed implementation.*

### Summary
This problem uses the **Connected Components** pattern (via DFS or Union-Find). It’s common for problems like "find all groups/item clusters with overlap". The **graph traversal or disjoint set union (DSU/Union-Find)** techniques used here are widely applicable—for example, friend circles, network connectivity, or anything requiring merging of related items by shared property.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Sorting(#sorting)

### Similar Problems
- Redundant Connection(redundant-connection) (Medium)
- Sentence Similarity(sentence-similarity) (Easy)
- Sentence Similarity II(sentence-similarity-ii) (Medium)