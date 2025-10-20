### Leetcode 1934 (Medium): Confirmation Rate [Practice](https://leetcode.com/problems/confirmation-rate)

### Description  
Given tables with user sign-up requests and confirmation actions, calculate each user's confirmation rate.
- Each row in the **Signups** table represents a user's sign-up action.
- Each row in the **Confirmations** table represents a confirmation action (could be 'confirmed' or 'timeout').
- For each user, compute the confirmation rate as the number of times they 'confirmed' divided by their total number of requests.
- If a user has no confirmations, their confirmation rate should be 0.00.
- Round the result to two decimal places.

### Examples  

**Example 1:**  
Input:  
Signups =  
| user_id |
|---------|
|   1     |
|   2     |
|   3     |
|   6     |

Confirmations =  
| user_id | action     |
|---------|------------|
|   1     | confirmed  |
|   1     | timeout    |
|   2     | confirmed  |
|   2     | timeout    |
|   3     | timeout    |
|   3     | timeout    |
|   4     | confirmed  |

Output:  
| user_id | confirmation_rate |
|---------|------------------|
|   1     |      0.50        |
|   2     |      0.50        |
|   3     |      0.00        |
|   6     |      0.00        |

*Explanation:*
- User 1: 1 'confirmed' / 2 requests = 0.50
- User 2: 1 'confirmed' / 2 requests = 0.50
- User 3: 0 'confirmed' / 2 requests = 0.00
- User 6: 0 confirmations (since no entries in Confirmations) = 0.00

**Example 2:**  
Input:  
Signups =  
| user_id |
|---------|
|   5     |

Confirmations =  
| user_id | action     |
|---------|------------|
|   5     | timeout    |

Output:  
| user_id | confirmation_rate |
|---------|------------------|
|   5     |      0.00        |

*Explanation:*
- User 5: 0 'confirmed' / 1 = 0.00

**Example 3:**  
Input:  
Signups =  
| user_id |
|---------|
|   7     |

Confirmations = (empty)  
Output:  
| user_id | confirmation_rate |
|---------|------------------|
|   7     |      0.00        |

*Explanation:*
- User 7: 0 'confirmed' / 0 = 0.00 (as per problem requirement)

### Thought Process (as if you’re the interviewee)  

- Start by understanding that we need the confirmation rate per user in Signups, not confirmations overall.
- Brute-force: For each user, count their total requests (total rows in Confirmations with their user_id). Then, count confirmed actions.
- Even if a user has no confirmations, they should appear in the output (i.e., a left join needed).
- Steps:
  - For each user in Signups, left join to Confirmations.
  - For each user, for confirmation rate: number of 'confirmed' actions / total confirmations (requests).
  - If user has no matched Confirmations, confirmation rate is 0.00.
  - Use rounding or formatting to ensure two decimal places.
- Avoid common mistakes:
  - Not outputting users with no Confirmations.
  - Incorrect division (dividing by zero).
  - Forgetting to round to two decimal places.

### Corner cases to consider  
- User exists in Signups but no Confirmations (output should be 0.00).
- User has only timeouts, no confirmed (confirmation rate 0.00).
- No users in Confirmations at all.
- Users in Confirmations but not in Signups (ignore them).
- Multiple confirmations per user.
- Division by zero (should be handled as 0.00).

### Solution

```python
# Assume input as two lists of dictionaries for demonstration:
# signups = [{'user_id': ...}, ...]
# confirmations = [{'user_id': ..., 'action': ...}, ...]

def confirmation_rate(signups, confirmations):
    # Build a dictionary to count confirmations and confirmed-actions per user
    from collections import defaultdict

    total_requests = defaultdict(int)
    confirmed_count = defaultdict(int)

    # Count confirmations for each user
    for entry in confirmations:
        uid = entry['user_id']
        total_requests[uid] += 1
        if entry['action'] == 'confirmed':
            confirmed_count[uid] += 1

    # Prepare result for all user_ids in signups
    result = []
    for user in signups:
        uid = user['user_id']
        total = total_requests.get(uid, 0)
        confirmed = confirmed_count.get(uid, 0)
        # As per problem, if there are no requests, rate is 0.00
        rate = (confirmed / total) if total > 0 else 0
        # Round to two decimal places
        # Use float formatting: "{:.2f}".format(rate)
        result.append({'user_id': uid, 'confirmation_rate': float(f"{rate:.2f}")})

    return result

# Example usage:
signups = [{'user_id': 1}, {'user_id': 2}, {'user_id': 3}, {'user_id': 6}]
confirmations = [
    {'user_id': 1, 'action': 'confirmed'},
    {'user_id': 1, 'action': 'timeout'},
    {'user_id': 2, 'action': 'confirmed'},
    {'user_id': 2, 'action': 'timeout'},
    {'user_id': 3, 'action': 'timeout'},
    {'user_id': 3, 'action': 'timeout'},
    {'user_id': 4, 'action': 'confirmed'}
]
print(confirmation_rate(signups, confirmations))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M)  
  N = number of confirmations, M = number of signups  
  We process both lists once each to build counts and results.
- **Space Complexity:** O(U)  
  U = number of unique user_ids in signups  
  Additional space used for dictionaries holding counts.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the confirmation action could have more than just 'confirmed' or 'timeout'?  
  *Hint: Consider a dynamic mapping or set of acceptable actions.*

- What if sign-up date or confirmation timestamp is relevant (e.g., rate in last 7 days)?  
  *Hint: Add date filtering logic before computing rates.*

- If the Confirmations table is very large, how would you optimize it in a database context?  
  *Hint: Indexes on user_id, use window functions, or aggregate before joining.*

### Summary
This problem is a classic **left join and aggregation** scenario, mapping well to SQL joins or dictionary counting in Python. The core pattern is finding the "rate" or "percentage" for an event among total occurrences for a group. This pattern is common in analyzing conversion rates, error rates, or ratios in data tables—making it a practical building block for real-world analytics and reporting queries.


### Flashcard
For each user, left join to confirmations, then compute confirmed/total as rate (include users with zero confirmations).

### Tags
Database(#database)

### Similar Problems
