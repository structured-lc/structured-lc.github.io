### Leetcode 3124 (Medium): Find Longest Calls [Practice](https://leetcode.com/problems/find-longest-calls)

### Description  
Given two tables, **Contacts** and **Calls**, you are asked to find the **three longest calls** for each type (i.e., 'incoming' and 'outgoing'). Each call is associated with a contact. For the output, return the contact’s **first name**, the **type** of the call, and the **duration in HH:MM:SS** format. The result should be sorted by:
- `type` in descending order ('outgoing' before 'incoming'),
- `duration` in descending order,
- `first_name` in descending order.

### Examples  

**Example 1:**  
Input:  
Contacts:  
| id | first_name | last_name |
|----|------------|-----------|
| 1  | Alice      | Smith     |
| 2  | Bob        | Jones     |
| 3  | Jane       | Lee       |

Calls:  
| contact_id | type      | duration |
|------------|-----------|----------|
| 1          | incoming  | 400      |
| 1          | outgoing  | 340      |
| 2          | outgoing  | 500      |
| 3          | outgoing  | 100      |
| 2          | incoming  | 300      |
| 3          | incoming  | 600      |

Output:  
| first_name | type      | duration_formatted |
|------------|-----------|-------------------|
| Bob        | outgoing  | 00:08:20          |
| Alice      | outgoing  | 00:05:40          |
| Jane       | outgoing  | 00:01:40          |
| Jane       | incoming  | 00:10:00          |
| Alice      | incoming  | 00:06:40          |
| Bob        | incoming  | 00:05:00          |

*Explanation: Sort by type (outgoing first), then by duration, then by first_name (all descending). Take top 3 for incoming and outgoing each, with duration formatted as HH:MM:SS.*

**Example 2:**  
Input:  
Contacts:  
| id | first_name | last_name |
|----|------------|-----------|
| 4  | Carol      | Brown     |

Calls:  
| contact_id | type      | duration |
|------------|-----------|----------|
| 4          | incoming  | 500      |
| 4          | outgoing  | 100      |

Output:  
| first_name | type      | duration_formatted |
|------------|-----------|-------------------|
| Carol      | outgoing  | 00:01:40          |
| Carol      | incoming  | 00:08:20          |

*Explanation: Only one record per type, so both are included and formatted.*

**Example 3:**  
Input:  
Contacts:  
| id | first_name | last_name |
|----|------------|-----------|
| 1  | Alice      | Smith     |

Calls:  
| contact_id | type      | duration |
|------------|-----------|----------|
| 1          | outgoing  | 7322     |
| 1          | outgoing  | 360      |
| 1          | incoming  | 10       |

Output:  
| first_name | type      | duration_formatted |
|------------|-----------|-------------------|
| Alice      | outgoing  | 02:02:02          |
| Alice      | outgoing  | 00:06:00          |
| Alice      | incoming  | 00:00:10          |

*Explanation: Fewer than three records per type, so include them all.*

### Thought Process (as if you’re the interviewee)  
- First, **join the Contacts and Calls tables** on `contact_id = id` to get names for each call.
- For each `type` ('incoming' and 'outgoing'), we want the **top 3 calls by duration**. Brute-force would be, for each type, sort all calls by duration and pick the first three.
- Use a **window/ranking function** to assign a rank within each `type`, ordered by duration descending.
- Filter for only rank ≤ 3.
- Durations must be formatted as HH:MM:SS. This requires converting the seconds accordingly.
- Finally, **sort output**: type ('outgoing' > 'incoming'), then duration desc, then first_name desc.

### Corner cases to consider  
- Fewer than 3 calls for a type.
- Ties in duration: sorting by first_name is needed.
- Multiple calls with exactly the same information.
- No records for a type.
- Very large durations (ensure formatting works for hours > 24).
- Zero duration call.

### Solution

```python
def seconds_to_hhmmss(duration):
    # Convert integer seconds to 'HH:MM:SS' string.
    h = duration // 3600
    m = (duration % 3600) // 60
    s = duration % 60
    return f"{h:02}:{m:02}:{s:02}"

def find_longest_calls(contacts, calls):
    # contacts: List[dict] with keys 'id', 'first_name', ...
    # calls: List[dict] with keys 'contact_id', 'type', 'duration'
    contact_lookup = {c['id']: c['first_name'] for c in contacts}
    
    # Step 1: Join calls with contact first names
    joined = []
    for call in calls:
        if call['contact_id'] in contact_lookup:
            joined.append({
                'first_name': contact_lookup[call['contact_id']],
                'type': call['type'],
                'duration': call['duration']
            })
    
    # Step 2: Group and rank by type and descending duration
    from collections import defaultdict
    type_groups = defaultdict(list)
    for rec in joined:
        type_groups[rec['type']].append(rec)
    
    # Step 3: Sort each type group and take top 3, then collect results
    result = []
    for call_type in ['outgoing', 'incoming']:  # order matters
        group = type_groups.get(call_type, [])
        group_sorted = sorted(group, key=lambda x: (x['duration'], x['first_name']), reverse=True)
        for rec in group_sorted[:3]:
            result.append({
                'first_name': rec['first_name'],
                'type': rec['type'],
                'duration_formatted': seconds_to_hhmmss(rec['duration'])
            })
    
    # Step 4: Final sorting as per requirements
    result_sorted = sorted(
        result,
        key=lambda x: (
            0 if x['type'] == 'outgoing' else 1,  # outgoing before incoming
            x['duration_formatted'],
            x['first_name']
        ),
        reverse=True
    )
    return result_sorted

# Example call for integration:
# contacts = [{'id':1, 'first_name':'Alice', 'last_name':'Smith'}, ...]
# calls = [{'contact_id':1, 'type':'outgoing', 'duration':400}, ...]
# print(find_longest_calls(contacts, calls))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) —  
  - Each type group is sorted by duration, and the total number of records is n (all calls).
  - Final sorting over at most 6 records is negligible.
- **Space Complexity:** O(n) —  
  - Extra space for the joined list of calls.
  - `type_groups` dict stores at most n entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to find the top k calls, and k is very large?
  *Hint: Can we avoid sorting the entire dataset for very large k?*

- How do you handle ties if there are more than three calls with the same duration for the third place?
  *Hint: Discuss deterministic tie-breaker with first_name, or include all tied records.*

- How would you modify your solution if given as a SQL query?
  *Hint: Use window functions (RANK/DENSE_RANK/ROW_NUMBER) for ranking per type, and convert seconds to time using SQL string functions.*

### Summary
This problem demonstrates the **ranking within groups** pattern (i.e., windowed ranking), joining tables, and custom formatting after grouping/top-k selection. This is common in leaderboard, statistics, or "top N per category" database/reporting scenarios, and can often be addressed similarly in both code and SQL using sorting or window functions.