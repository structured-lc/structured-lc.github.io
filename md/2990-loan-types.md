### Leetcode 2990 (Easy): Loan Types [Practice](https://leetcode.com/problems/loan-types)

### Description  
Given a database table `Loans` with columns (`loan_id`, `user_id`, `loan_type`), find all distinct **user_id** values who have at least one loan of type `'Mortgage'` and at least one loan of type `'Refinance'`. The result should be sorted by `user_id` ascending.

### Examples  

**Example 1:**  
Input:  
Loans table:  
```
[
  [683, 101, "Mortgage"],
  [218, 101, "AutoLoan"],
  [802, 101, "Inschool"],
  [593, 102, "Mortgage"],
  [138, 102, "Refinance"],
  [294, 102, "Inschool"],
  [308, 103, "Refinance"],
  [389, 104, "Mortgage"]
]
```
Output:  
``  
Explanation:  
- User 101: Mortgage, but no Refinance.
- User 102: Both Mortgage and Refinance. Included.
- User 103: Only Refinance.
- User 104: Only Mortgage.

**Example 2:**  
Input:  
```
[
  [111, 201, "AutoLoan"],
  [112, 201, "Refinance"],
  [113, 202, "Mortgage"],
  [114, 202, "Refinance"],
  [115, 203, "Inschool"]
]
```
Output:  
``  
Explanation:  
- User 201: Refinance but no Mortgage.
- User 202: Both Mortgage and Refinance. Included.
- User 203: Neither.

**Example 3:**  
Input:  
```
[
  [211, 301, "AutoLoan"],
  [212, 301, "Inschool"],
  [213, 302, "Mortgage"]
]
```
Output:  
`[]`  
Explanation:  
- Neither user has both types required.

### Thought Process (as if you’re the interviewee)  
I need to find user IDs who have both `Mortgage` and `Refinance` loans.  
- Brute force:  
  - For each user, gather their loan types.
  - Check if both `"Mortgage"` and `"Refinance"` are present.
- Optimize:  
  - Use a hash map (`user_id` ➔ set of loan types), scan all records once.
  - After building the map, include users in the result if their set contains both loan types.
This approach is efficient as it iterates over the dataset only a couple of times and uses a set for fast membership checking.

### Corner cases to consider  
- No users with both loans: return empty.
- Users with multiple loans of the same type (e.g., two Mortgages and no Refinance).
- Only one of the required loan types present for a user.
- No loans at all (empty table).
- Loan types with different case or typo (should match exactly `"Mortgage"` and `"Refinance"`).
- Large input.

### Solution

```python
def find_users_with_mortgage_and_refinance(loans):
    # loans: List[List[int, int, str]]: [loan_id, user_id, loan_type]
    user_loans = dict()
    for loan_id, user_id, loan_type in loans:
        # Initialize the set for new user_id
        if user_id not in user_loans:
            user_loans[user_id] = set()
        # Add the loan_type
        user_loans[user_id].add(loan_type)
    # Collect user_ids who have both 'Mortgage' and 'Refinance'
    result = []
    for user_id in user_loans:
        if 'Mortgage' in user_loans[user_id] and 'Refinance' in user_loans[user_id]:
            result.append(user_id)
    # Return user_ids sorted ascending
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of loan records — single pass to build the mapping, another to collect result (loops are over users, which ≤ n).
- **Space Complexity:** O(u), where u is the number of unique users (for the dictionary), plus small sets per user — overall proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list is too large to fit in memory?  
  *Hint: Can we process user records in a streaming fashion or via external sorting/aggregation?*

- What if loan types of interest could change (e.g., dynamic list)?  
  *Hint: Generalize the check to see if each user has all required loan types.*

- What if loan types are case-insensitive or there are typos?  
  *Hint: Standardize strings (e.g., lowercasing) or use fuzzy matching.*

### Summary
This problem uses the classic **hash map grouping** pattern — collect items into groups, then filter on group properties.  
Variations of this appear in problems such as "Group Anagrams", "Find Users with All Roles", or any multi-key existence check.  
Efficient, easy to reason about, and adaptable to more complex grouping queries.