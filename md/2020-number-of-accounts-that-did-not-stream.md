### Leetcode 2020 (Medium): Number of Accounts That Did Not Stream [Practice](https://leetcode.com/problems/number-of-accounts-that-did-not-stream)

### Description  
Given two tables—Subscriptions and Streams—find the **number of accounts** that purchased a subscription in 2021 **but did not have any stream sessions**.  
- The Subscriptions table includes columns: `account_id`, `start_date`, `end_date`.
- The Streams table has columns: `account_id`, `stream_date`.  
Only consider accounts whose subscription’s end_date is on or after 2021-01-01 and that have **no stream activity at all** (i.e., their account_id is not in Streams for 2021 or earlier).

### Examples  

**Example 1:**  
Input:  
Subscriptions table:  
```
account_id | start_date  | end_date
-----------|------------|------------
1          | 2020-10-01 | 2021-03-10
2          | 2021-01-01 | 2021-12-31
3          | 2021-01-05 | 2021-04-01
```
Streams table:  
```
account_id | stream_date
-----------|------------
1          | 2021-02-15
3          | 2021-01-12
```
Output: `1`  
*Explanation:*
- Account 2: has a subscription covering 2021 and **did not stream at all**.
- Accounts 1 and 3: both have streams after their 2021 subscription started.
- So, only account 2 is counted.

**Example 2:**  
Input:  
Subscriptions:  
```
account_id | start_date  | end_date
-----------|------------|------------
4          | 2020-07-03 | 2022-02-10
5          | 2021-05-03 | 2021-11-11
```
Streams:  
```
account_id | stream_date
-----------|------------
4          | 2021-09-09
5          | 2022-01-20
```
Output: `0`  
*Explanation:*
- Both accounts streamed during or after their subscription in 2021, so neither is counted.

**Example 3:**  
Input:  
Subscriptions:  
```
account_id | start_date  | end_date
-----------|------------|------------
7          | 2021-04-10 | 2022-01-01
8          | 2021-06-15 | 2021-09-19
```
Streams:  
_None_  
Output: `2`  
*Explanation:*
- Both accounts had active 2021 subscriptions and never streamed, so the answer is 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each account with a 2021 subscription, check if its `account_id` is in the Streams table.
    - If not, count it.  
    - This requires for each Subscriptions row, scanning the Streams table, which is O(M×N) and inefficient.
- **Better:**  
    - Use a set or hash map to quickly check which accounts have streamed.
    - Collect all accounts with a subscription ending in 2021 or later.  
    - For these accounts, count those **not present** in the Streams table at all.
    - This way, time is O(M + N).
- **SQL Approach (final, optimal):**
    - LEFT JOIN Subscriptions (where end_date ≥ '2021-01-01') with Streams on `account_id`.
    - Filter for rows where Streams.account_id IS NULL (meaning the account never streamed).
    - COUNT the number of such account_ids.

### Corner cases to consider  
- No subscriptions in 2021 or later ⇒ output should be 0.
- No stream records at all ⇒ output is the number of 2021+ subscriptions.
- Subscriptions covering 2021 but only streaming before the subscription period.
- Duplicates in Streams (same account streams multiple times).
- Multiple subscriptions for the same account covering 2021 (should count only once).
- Accounts with subscription ended before 2021, but streams exist (should not be counted).
- Subscription start or end exactly at '2021-01-01'.

### Solution

```python
def number_of_accounts_no_stream(subscriptions, streams):
    # subscriptions: list of [account_id, start_date, end_date]
    # streams: list of [account_id, stream_date]
    # Step 1: Get all account_ids who had subscriptions covering 2021 or later
    eligible_accounts = set()
    for account_id, start, end in subscriptions:
        if end >= '2021-01-01':
            eligible_accounts.add(account_id)
    # Step 2: Get all account_ids who streamed (any time)
    streamed_accounts = set()
    for account_id, _ in streams:
        streamed_accounts.add(account_id)
    # Step 3: For eligible accounts, count those who have not streamed at all
    count = 0
    for account_id in eligible_accounts:
        if account_id not in streamed_accounts:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(M + N), where M = number of subscriptions, N = number of streams.  
  Each is traversed once to build sets and check membership.
- **Space Complexity:**  
  O(M + N) for storing the sets of eligible and streamed account_ids.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a user has multiple subscriptions but streamed in only one of them?  
  *Hint: Does your method count accounts, or account×subscriptions?*

- How would you handle massive data?  
  *Hint: Can you use streaming algorithms, or process data in batches?*

- How does this change if you need the list of such accounts, not just the count?  
  *Hint: Just return the set instead of its length.*

### Summary
The approach uses set operations to efficiently determine which 2021+ subscribers never streamed, a **hashing/counting pattern** common in “find elements in one set not present in another” problems. This is a classic use of hash sets for efficient existence checks and can be seen in problems like finding non-intersecting arrays, event logging, or membership analytics.


### Flashcard
Count accounts that did not stream by using a set to quickly check for streaming activity.

### Tags
Database(#database)

### Similar Problems
