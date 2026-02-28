FROM python:3.12-slim

WORKDIR /app

# 依存を先に入れてキャッシュを効かせる
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r /app/requirements.txt

# ソースは後でコピー（開発はvolumeで上書きされる）
# `app` ディレクトリの中身を `/app` に配置して、コンテナ内で `app/app` と
# ならないようにする
COPY ./app/ /app/

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]