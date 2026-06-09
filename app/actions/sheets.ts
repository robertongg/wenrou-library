'use server';

import { google } from "googleapis";

export async function getSheetRows(range: string) {
    try {
        const auth = new google.auth.JWT({
            email: "service-account@wenrou-library.iam.gserviceaccount.com",
            key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvBT1hVXE+zKQr\n7BAwW7pAS/W/4rKUBdPc8d1iKY0GRN1Fa1qap1YpT/XRUtfqG27g5unVKTh2GOIp\ntO/OfG4IBnVGC23dqwY0JUdlbb9bVfy2JdUXGcZ/LpEK0hvEbDvpaCSRW0NBLA+m\nKyuFjWwUL6OTjSU1n3+S3/4ABzzFW5amLbt6ZzBMRduZbg/xIdmZ+5r+eiQDcHKO\nI/rHwcdMJT11n7Dext4ALenkLj55aRJcV8U64Fb28HBY+Vqvhx5ezKgW8lBpOetK\ntOFOwmddGLeygIlu3BWrXVgHPfjiqi5xSx7M9HScnWD1I3WDq43hYB2z64xDLvDk\nWo6ugKktAgMBAAECggEAHCgW+dkJwPVMgWxsJlDQzpXp0UGil8G1ldlV/lF6SJnn\nkcrK5rp+WA3Ebt/fBeCn891HnRgRPJ6ViT7R8uwoX3jP1mxG898XE73eQJO+se5M\nG5mhMHg1wNw4T/9WoZZar8V7VznRa2NamScKIhA1ulb3qpM4ez9PrMywS5zedU7E\niMcYVXqRpj9g9rr7yr0qbF8JP0px5fHp0cyAbWKTsTK6sdPapuD5p7kyN/ElXITy\nN9urLFttRYSxL7K341qSFMkt/wTsz5KhCGGZz/PSQ8DVUB1l8jKH6UZOHoWJQqH9\nVcI401AOWqT5mj0YPxsvp4zsSWYRGxQJTBpq5o0XmQKBgQDgM7zM2pebNko/RJC3\nSv9p1+yccsqsNmAZ3UoRwFkYylDtOyC+O9MQn0GH3ZdpXSDAvyi9ftQdQZNrOvXG\njGSv8RssD7bzr3FcZsaCgB8tXZlne020N/YKNan3uKlUD+4RM3REAWcj9svbdOvT\niD3SIBosTo2OtcYZDIgFDA8W5wKBgQDH19SRywqCNT9nzS9i5vUA2taK8fahWBFO\npUUD5wKck8VLV7dyD2587XjXIOBa9D6B9jMd4MMJPMDxQyZPZ6CfwA4rXN86n5sv\n4Sn3fs+4RKu4odapY7FvEGmPrtJax2wJf9QztNHsoF0MgTQ4vphJhTy4YICeZIJc\ndgrs73qAywKBgDW3b6bNQMGpUkSyUtH3oBZl64TYZAK6zG+l+1chdLdh0d3k6sVp\nY/p5jaPVza8q5uwHYOV1+7A+w+lPKQ+3F3CoHdCCu1zLTifLYAhoVg/yewy2GDnz\npnlvvhdiIP/JCUsJvvOEOof9W35rFw2JePZdRqgS8gudNadOv1AmQX9FAoGAULJ2\nw+iZdbrKv7+7QtTAWngD6leKn9xQINHb7Jd8Fn4VTTc+fHB+zTOXeEduUUwPcatZ\nONdp6nD9+G6FKctOsTN8hUYbXjDVGaBysd4jQuV38jZn2D7Jh2+5MKwHhWDB35Qe\nvEJoAoU/Da2eyMst84I54roVNeCgQ3XnM4YAkcECgYEArVoueqDYem+12Va33Deu\nL2inBRyXCR2z6ZsE6PrJx2qZznGRavNBUEqwc5Vs1tdMjh0aFdzd/BNGH38vHfYL\nobKX9ROBgJnRinXJewaOYs9/kq3tOZyUXBaqDmr556m4igWFRnog7JpdQN9nsB0U\nLNbuUfCBGuLQKEM/lhOS2fQ=\n-----END PRIVATE KEY-----\n",
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
        });

        const sheets = google.sheets({ version: "v4", auth });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: "193P7sTidnhJKZ-gBi0DB7at0z1L4qEQx-wRQuxEHRko",
            range: range,
        });

        return response.data.values || [];
    } catch (error) {
        console.error("Error fetching sheets data:", error);
        return [];
    }
}
