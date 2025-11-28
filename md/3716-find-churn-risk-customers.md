### Leetcode 3716 (Medium): Find Churn Risk Customers [Practice](https://leetcode.com/problems/find-churn-risk-customers)

### Description  
Given a table of subscription events per user—each row containing event information like type (start, upgrade, downgrade, cancel), plan name, amount, and date—the goal is to identify users at *churn risk*.  
A **churn risk customer** is someone who:  
- Currently has an active subscription (last event is not cancel).
- Has performed at least one downgrade.
- Their current monthly amount is **less than 50%** of their all-time highest plan amount.
- Has been a subscriber for **at least 60 days**.  
Return results ordered by **days as subscriber** (descending), then **user_id** (ascending).

### Examples  

**Example 1:**  
Input:  
```
subscription_events = [
  {event_id: 1, user_id: 501, event_date: '2024-01-01', event_type: 'start', plan_name: 'standard', monthly_amount: 19.99},
  {event_id: 2, user_id: 501, event_date: '2024-01-15', event_type: 'upgrade', plan_name: 'premium', monthly_amount: 29.99},
  {event_id: 3, user_id: 501, event_date: '2024-02-20', event_type: 'downgrade', plan_name: 'standard', monthly_amount: 19.99},
  {event_id: 4, user_id: 501, event_date: '2024-03-01', event_type: 'downgrade', plan_name: 'basic', monthly_amount: 9.99}
]
```
Output:  
```
user_id: 501, days_as_subscriber: 60
```
*Explanation: User 501 is active, has at least one downgrade, current monthly amount 9.99 < 50% × 29.99 (14.995), subscriber for 60 days.*

**Example 2:**  
Input:  
```
subscription_events = [
  {event_id: 5, user_id: 502, event_date: '2024-01-10', event_type: 'start', plan_name: 'standard', monthly_amount: 19.99},
  {event_id: 6, user_id: 502, event_date: '2024-02-01', event_type: 'downgrade', plan_name: 'basic', monthly_amount: 9.99},
  {event_id: 7, user_id: 502, event_date: '2024-02-25', event_type: 'cancel', plan_name: null, monthly_amount: 0.00}
]
```
Output:  
```
(No output: user 502 is cancelled)
```
*Explanation: Last event is cancel, so user 502 is not active—excluded.*

**Example 3:**  
Input:  
```
subscription_events = [
  {event_id: 8, user_id: 503, event_date: '2024-01-01', event_type: 'start', plan_name: 'premium', monthly_amount: 29.99},
  {event_id: 9, user_id: 503, event_date: '2024-04-01', event_type: 'downgrade', plan_name: 'basic', monthly_amount: 9.99}
]
```
Output:  
```
user_id: 503, days_as_subscriber: 91
```
*Explanation: Active, one downgrade, 9.99 < 50% × 29.99, subscriber for 91 days.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: For each user, scan all events, keep track of downgrades, the highest historical amount, and determine their last event. Check if last event is not cancel, check downgrade, compare amounts, and calculate tenure.
- **Optimization**:  
    - Group all rows by `user_id`.  
    - For each user:
        - Find if any event is `downgrade`.
        - Find highest plan amount historically.
        - Find last event (by event_date), check last event type and latest amount.
        - Calculate days between first and last event.
        - Only add user to result if all rules are satisfied.
    - Sort output by days_as_subscriber (desc), user_id (asc).
- **Trade-offs**: Using dictionaries/grouping is preferred for O(n) scan; repeated filtering is costly but grouping resolves that. Sorting is O(k log k), where k = number of selected users.

### Corner cases to consider  
- No events at all
- User only started, never downgraded
- Plan amounts never decrease below 50%
- Last event is 'cancel'
- Multiple downgrades, upgrades, and cancels per user
- Event dates out of order (so always sort before processing user history)
- Tenure < 60 days
- Users with only upgrade events  
- Negative/zero subscription amounts

### Solution

```python
from datetime import datetime

def find_churn_risk_customers(subscription_events):
    # Group events by user_id
    user_events = {}
    for event in subscription_events:
        user_id = event['user_id']
        user_events.setdefault(user_id, []).append(event)

    result = []

    for user_id, events in user_events.items():
        # Sort events by event_date ascending
        events.sort(key=lambda e: e['event_date'])

        # Track historical maximum amount
        max_amount = max(e['monthly_amount'] for e in events)
        # Check if any downgrade event
        has_downgrade = any(e['event_type'] == 'downgrade' for e in events)

        # Last event data
        last_event = events[-1]
        last_amount = last_event['monthly_amount']
        last_type = last_event['event_type']
        last_date = datetime.strptime(last_event['event_date'], "%Y-%m-%d")
        first_date = datetime.strptime(events[0]['event_date'], "%Y-%m-%d")
        days_subscriber = (last_date - first_date).days

        # Check 4 rules:
        if (last_type != 'cancel' and
            has_downgrade and
            last_amount < 0.5 * max_amount and
            days_subscriber >= 60):
                result.append((user_id, days_subscriber))

    # Sort: days_as_subscriber desc, then user_id asc
    result.sort(key=lambda x: (-x[1], x[0]))

    # Format result as list of dicts for readability
    output = [{'user_id': uid, 'days_as_subscriber': d} for uid, d in result]
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k log k)  
    - n = total events; k = churn risk users.
    - Grouping and scanning is O(n); sorting result is O(k log k).
- **Space Complexity:** O(n)  
    - Dictionary to group all events by user, plus result list.

### Potential follow-up questions (as if you’re the interviewer)  

- Consider subscriptions with overlapping dates or reactivations  
  *Hint: What if a user cancels and restarts?*

- Efficient handling for large datasets in distributed systems  
  *Hint: Can you parallelize the grouping by user_id?*

- Add real-time streaming support  
  *Hint: How would you maintain per-user state if events come in out-of-order/incrementally?*

### Summary
This solution uses the **grouping by key** pattern to aggregate user histories, then applies simple rule checks—demonstrating how to combine data parsing, aggregation, and filtering based on multiple criteria.  
This approach is common in SQL, pandas, and event-tracking problems, and can be adapted for real-time analytics with queue or batch processing.


### Flashcard
Group events by user_id; for each user, track if any downgrade exists, find the highest plan amount, and check if the last event is not a cancellation.

### Tags

### Similar Problems
